import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Prediction } from '@/hooks/use-tensorflow';
import { getDiseaseById } from '@/constants/diseases';
import ConfidenceBar from './ConfidenceBar';
import { adjustConfidence } from '@/utils/confidence-utils';

interface PredictionListProps {
  predictions: Prediction[];
  onSelectDisease: (diseaseId: string) => void;
}

export default function PredictionList({ predictions, onSelectDisease }: PredictionListProps) {
  if (!predictions || predictions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No predictions available</Text>
      </View>
    );
  }

  // Get only the top prediction with highest confidence
  const topPrediction = predictions[0];
  
  // Safety check to ensure prediction has className
  if (!topPrediction || !topPrediction.className) {
    console.warn('Invalid prediction object:', topPrediction);
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Invalid prediction data</Text>
      </View>
    );
  }
  
  const disease = getDiseaseById(topPrediction.className);
  if (!disease) {
    console.warn(`Disease not found: ${topPrediction.className}`);
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Disease information not found</Text>
      </View>
    );
  }
  
  // Adjust confidence to be more realistic
  const adjustedConfidence = adjustConfidence(topPrediction.probability);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis Result</Text>
      
      <TouchableOpacity
        style={styles.predictionItem}
        onPress={() => onSelectDisease(topPrediction.className)}
        activeOpacity={0.7}
      >
        <View style={styles.predictionContent}>
          <View style={styles.predictionHeader}>
            <Text style={styles.diseaseName}>
              {disease.name}
            </Text>
            <ChevronRight size={20} color={colors.textLight} />
          </View>
          
          <ConfidenceBar confidence={adjustedConfidence} />
          
          <Text style={styles.description} numberOfLines={3}>
            {disease.description}
          </Text>
        </View>
      </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
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