import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { diseases } from '@/constants/diseases';

//prediction interface
export interface Prediction {
  className: string;
  probability: number;
}

// API configuration
const API_CONFIG = {
  baseUrl: 'https://cambie-model.onrender.com/', 
  endpoints: {
    predict: '/predict'
  }
};

export default function useTensorflow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelLoaded, setModelLoaded] = useState(true); // Always true since we're using an API

  // Run inference on the image by sending it to the API server
  const predict = async (imageUri: string): Promise<Prediction[]> => {
    setLoading(true);
    setError(null);

    try {
      console.log('Preparing image for API submission...');
      
      // Resize the image to reduce upload size
      const resizedImage = await manipulateAsync(
        imageUri,
        [{ resize: { width: 224, height: 224 } }],
        { format: SaveFormat.JPEG, compress: 0.8 }
      );
      
      // Convert image to base64
      const base64Image = await FileSystem.readAsStringAsync(resizedImage.uri, {
        encoding: FileSystem.EncodingType.Base64
      });
      
      console.log('Sending image to API server...');
      
      // Send to API
      const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.predict}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          image: `data:image/jpeg;base64,${base64Image}`
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Received predictions from server:', data.predictions);
      
      // Ensure valid predictions
      if (!data.predictions || !Array.isArray(data.predictions)) {
        throw new Error('Invalid response format from server');
      }
      
      // Map the predictions to format and ensure they're valid
      const predictions: Prediction[] = data.predictions.map((pred: any) => ({
        className: pred.className || 'unknown',
        probability: typeof pred.probability === 'number' ? pred.probability : 0
      }));
      
      
      predictions.sort((a, b) => b.probability - a.probability);
      
      // Take top 1 predictions
      return predictions.slice(0, 1);
    } catch (err: any) {
      console.error('Prediction error:', err);
      setError(err.message || 'Error processing image');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    modelLoaded,
    loading,
    error,
    predict
  };
}