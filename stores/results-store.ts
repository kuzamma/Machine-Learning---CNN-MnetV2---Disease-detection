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
        const newResult: PredictionResult = {
          ...result,
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