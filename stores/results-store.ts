import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PredictionResult {
  id: string;
  timestamp: number;
  imageUri: string;
  predictions: {
    className: string;
    probability: number;
  }[];
}

interface ResultsState {
  results: PredictionResult[];
  addResult: (result: Omit<PredictionResult, 'id' | 'timestamp'>) => void;
  clearResults: () => void;
  getResultById: (id: string) => PredictionResult | undefined;
}

export const useResultsStore = create<ResultsState>()(
  persist(
    (set, get) => ({
      results: [],
      
      addResult: (result) => set((state) => {
        // Validate the result before adding
        if (!result.predictions || !Array.isArray(result.predictions)) {
          console.error('Invalid predictions array:', result.predictions);
          return state; // Return unchanged state
        }
        
        // Ensure all predictions have className and probability
        const validPredictions = result.predictions.filter(
          p => p && typeof p.className === 'string' && typeof p.probability === 'number'
        );
        
        if (validPredictions.length === 0) {
          console.error('No valid predictions found');
          return state; // Return unchanged state
        }
        
        const newResult: PredictionResult = {
          ...result,
          predictions: validPredictions,
          id: Date.now().toString(),
          timestamp: Date.now(),
        };
        
        return {
          results: [newResult, ...state.results],
        };
      }),
      
      clearResults: () => set({ results: [] }),
      
      getResultById: (id) => {
        return get().results.find(result => result.id === id);
      },
    }),
    {
      name: 'disease-detection-results',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);