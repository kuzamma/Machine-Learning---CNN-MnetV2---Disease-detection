import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import colors from '@/constants/colors';
import ModelInfoDetailed from '@/components/ModelInfoDetailed';

export default function ModelInfoScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Model Information' }} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ModelInfoDetailed
            name="MobileNetV2-DiseaseDetection"
            version="1.0.0"
            inputShape={[224, 224, 3]}
            quantized={true}
            accuracyMetrics={{
              precision: 0.89,
              recall: 0.87,
              f1Score: 0.88
            }}
            showTechnicalDetails={true}
          />
        </ScrollView>
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
    padding: 16,
  },
});