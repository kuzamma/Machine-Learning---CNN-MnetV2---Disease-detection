import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Prediction } from '@/hooks/use-tensorflow';
import { getDiseaseById } from '@/constants/diseases';
import ConfidenceBar from './ConfidenceBar';

interface PredictionListProps {
  predictions: Prediction[];
  onSelectDisease: (diseaseId: string) => void;
}

export default function PredictionList({ predictions, onSelectDisease }: PredictionListProps) {
  if (predictions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No predictions available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis Results</Text>
      
      {predictions.map((prediction, index) => {
        const disease = getDiseaseById(prediction.className);
        if (!disease) return null;
        
        const isTopPrediction = index === 0;
        
        return (
          <TouchableOpacity
            key={prediction.className}
            style={[
              styles.predictionItem,
              isTopPrediction && styles.topPrediction
            ]}
            onPress={() => onSelectDisease(prediction.className)}
            activeOpacity={0.7}
          >
            <View style={styles.predictionContent}>
              <View style={styles.predictionHeader}>
                <Text style={[
                  styles.diseaseName,
                  isTopPrediction && styles.topDiseaseName
                ]}>
                  {disease.name}
                  {isTopPrediction && <Text style={styles.topMatch}> (Top Match)</Text>}
                </Text>
                <ChevronRight size={20} color={colors.textLight} />
              </View>
              
              <ConfidenceBar confidence={prediction.probability} />
              
              {isTopPrediction && (
                <Text style={styles.description} numberOfLines={2}>
                  {disease.description}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  predictionItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  topPrediction: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  predictionContent: {
    flex: 1,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  topDiseaseName: {
    fontSize: 18,
  },
  topMatch: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 12,
    lineHeight: 20,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
  },
});