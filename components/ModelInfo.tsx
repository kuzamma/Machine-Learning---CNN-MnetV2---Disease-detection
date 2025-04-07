import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/constants/colors';
import Card from './Card';

interface ModelInfoProps {
  name: string;
  version: string;
  inputShape: number[];
  accuracyMetrics: {
    precision: number;
    recall: number;
    f1Score: number;
  };
}

export default function ModelInfo({ 
  name, 
  version, 
  inputShape, 
  accuracyMetrics 
}: ModelInfoProps) {
  return (
    <Card>
      <Text style={styles.title}>Model Information</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Version:</Text>
        <Text style={styles.value}>{version}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Input Shape:</Text>
        <Text style={styles.value}>{inputShape.join(' × ')}</Text>
      </View>
      
      
      <Text style={styles.subtitle}>Accuracy Metrics</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Precision:</Text>
        <Text style={styles.value}>{(accuracyMetrics.precision * 100).toFixed(1)}%</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Recall:</Text>
        <Text style={styles.value}>{(accuracyMetrics.recall * 100).toFixed(1)}%</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>F1 Score:</Text>
        <Text style={styles.value}>{(accuracyMetrics.f1Score * 100).toFixed(1)}%</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: colors.textLight,
    width: 100,
  },
  value: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
});