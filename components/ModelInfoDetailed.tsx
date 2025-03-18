import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '@/constants/colors';
import Card from './Card';

interface ModelInfoDetailedProps {
  name: string;
  version: string;
  inputShape: number[];
  quantized: boolean;
  accuracyMetrics: {
    precision: number;
    recall: number;
    f1Score: number;
  };
  showTechnicalDetails?: boolean;
}

export default function ModelInfoDetailed({ 
  name, 
  version, 
  inputShape, 
  quantized,
  accuracyMetrics,
  showTechnicalDetails = false
}: ModelInfoDetailedProps) {
  return (
    <ScrollView>
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
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Quantized:</Text>
          <Text style={styles.value}>{quantized ? 'Yes' : 'No'}</Text>
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

        {showTechnicalDetails && (
          <>
            <Text style={styles.subtitle}>Technical Details</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Architecture:</Text>
              <Text style={styles.value}>MobileNetV2</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Model Size:</Text>
              <Text style={styles.value}>4.8 MB (quantized)</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Preprocessing:</Text>
              <Text style={styles.value}>Resize to 224×224, normalize to [0,1]</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Training Data:</Text>
              <Text style={styles.value}>10,000+ images across 7 disease classes</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Inference Time:</Text>
              <Text style={styles.value}>~200ms on modern devices</Text>
            </View>
            
            <Text style={styles.subtitle}>Model Architecture</Text>
            <Text style={styles.description}>
              This model is based on MobileNetV2, a lightweight convolutional neural network 
              designed for mobile and embedded vision applications. The base MobileNetV2 
              architecture has been fine-tuned for disease detection with a custom 
              classification head consisting of global average pooling followed by 
              fully-connected layers with dropout for regularization.
            </Text>
          </>
        )}
      </Card>
    </ScrollView>
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
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginTop: 8,
  },
});