import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

interface ConfidenceBarProps {
  confidence: number; // 0 to 1
}

export default function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  // Ensure confidence is between 0 and 1
  const safeConfidence = Math.max(0, Math.min(1, confidence));
  
  // Format confidence as a percentage with two decimal places
  const confidencePercentage = (safeConfidence * 100).toFixed(2);

  // Determine color based on confidence level
  const getColor = () => {
    if (safeConfidence < 0.4) return colors.error;
    if (safeConfidence < 0.7) return colors.warning;
    return colors.success;
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Confidence</Text>
        <Text style={styles.percentage}>{confidencePercentage}%</Text>
      </View>
      <View style={styles.barBackground}>
        <View 
          style={[
            styles.barFill, 
            { 
              width: `${safeConfidence * 100}%`,
              backgroundColor: getColor()
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  barBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});