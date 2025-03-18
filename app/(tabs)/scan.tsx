import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Camera, FileImage, RefreshCw } from 'lucide-react-native';
import colors from '@/constants/colors';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import ImagePreview from '@/components/ImagePreview';
import ProcessingSteps from '@/components/ProcessingSteps';
import PredictionList from '@/components/PredictionList';
import useImagePicker from '@/hooks/use-image-picker';
import useTensorflow, { Prediction } from '@/hooks/use-tensorflow';
import { useResultsStore } from '@/stores/results-store';

export default function ScanScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ source?: string }>();
  const { image, loading: imageLoading, pickImage, takePhoto, clearImage } = useImagePicker();
  const { predict, loading: modelLoading, modelLoaded, error } = useTensorflow();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const addResult = useResultsStore(state => state.addResult);

  // Handle initial source param (from home screen)
  useEffect(() => {
    if (params.source === 'gallery') {
      pickImage();
    }
  }, [params.source]);

  const handleAnalyze = async () => {
    if (!image) return;
    
    try {
      setAnalyzing(true);
      setProcessingComplete(false);
      
      // We'll show the processing steps UI first
      // The actual prediction will happen after the UI animation completes
    } catch (err) {
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
      setAnalyzing(false);
    }
  };

  const handleProcessingComplete = async () => {
    if (!image) return;
    
    try {
      // Now run the actual prediction
      const results = await predict(image);
      setPredictions(results);
      setProcessingComplete(true);
      
      // Save results to store
      addResult({
        imageUri: image,
        predictions: results,
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    clearImage();
    setPredictions([]);
    setProcessingComplete(false);
  };

  const handleSelectDisease = (diseaseId: string) => {
    router.push({
      pathname: '/disease-details',
      params: { id: diseaseId }
    });
  };

  const renderContent = () => {
    if (analyzing) {
      return (
        <View style={styles.processingContainer}>
          <Text style={styles.processingTitle}>Analyzing Image</Text>
          <ProcessingSteps onComplete={handleProcessingComplete} />
        </View>
      );
    }

    if (processingComplete && predictions.length > 0 && image) {
      return (
        <View style={styles.resultsContainer}>
          <ImagePreview uri={image} onRemove={handleReset} />
          <PredictionList 
            predictions={predictions} 
            onSelectDisease={handleSelectDisease} 
          />
          <Button 
            title="Scan Another Image" 
            onPress={handleReset}
            icon={<RefreshCw size={20} color={colors.white} />}
            style={styles.scanAgainButton}
          />
        </View>
      );
    }

    if (image) {
      return (
        <View style={styles.previewContainer}>
          <ImagePreview uri={image} onRemove={clearImage} />
          <Button 
            title="Analyze Image" 
            onPress={handleAnalyze}
            loading={modelLoading}
            disabled={!modelLoaded}
          />
          {!modelLoaded && (
            <Text style={styles.modelLoadingText}>
              Loading AI model, please wait...
            </Text>
          )}
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
        </View>
      );
    }

    return (
      <EmptyState
        title="No Image Selected"
        description="Take a photo or select an image from your gallery to detect diseases."
        buttonTitle="Select Image"
        onButtonPress={pickImage}
      />
    );
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerTitle: 'Disease Scanner',
          headerTitleStyle: {
            fontWeight: '600',
          }
        }} 
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
        
        {!image && !analyzing && predictions.length === 0 && (
          <View style={styles.footer}>
            <Button
              title="Take Photo"
              onPress={takePhoto}
              icon={<Camera size={20} color={colors.white} />}
              style={styles.footerButton}
              disabled={Platform.OS === 'web'}
            />
            <Button
              title="Gallery"
              onPress={pickImage}
              variant="outline"
              icon={<FileImage size={20} color={colors.primary} />}
              style={styles.footerButton}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
}






const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 16,
    },
    processingContainer: {
      flex: 1,
      padding: 24,
    },
    processingTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 24,
      textAlign: 'center',
    },
    previewContainer: {
      flex: 1,
      alignItems: 'center',
    },
    modelLoadingText: {
      marginTop: 12,
      fontSize: 14,
      color: colors.textLight,
      textAlign: 'center',
    },
    errorText: {
      marginTop: 12,
      fontSize: 14,
      color: colors.error,
      textAlign: 'center',
    },
    resultsContainer: {
      flex: 1,
    },
    scanAgainButton: {
      marginTop: 16,
    },
    footer: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: colors.white,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    footerButton: {
      flex: 1,
      marginHorizontal: 8, 
    },
  }); 