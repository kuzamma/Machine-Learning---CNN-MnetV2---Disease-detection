import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Calendar, ChevronRight, Clock, AlertTriangle } from 'lucide-react-native';
import colors from '@/constants/colors';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ConfidenceBar from '@/components/ConfidenceBar';
import { useResultsStore } from '@/stores/results-store';
import { getDiseaseById } from '@/constants/diseases';

export default function ResultDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const getResultById = useResultsStore(state => state.getResultById);
  const result = getResultById(id);

  if (!result) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Result not found</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()} 
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const handleViewDiseaseDetails = (diseaseId: string) => {
    router.push({
      pathname: '/disease-details',
      params: { id: diseaseId }
    });
  };

  // Calculate total confidence (should be <= 1.0)
  const totalConfidence = result.predictions.reduce(
    (sum, prediction) => sum + prediction.probability, 
    0
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Scan Result' }} />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: result.imageUri }} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <Calendar size={16} color={colors.textLight} />
              <Text style={styles.metadataText}>{formatDate(result.timestamp)}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Clock size={16} color={colors.textLight} />
              <Text style={styles.metadataText}>{formatTime(result.timestamp)}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Analysis Results</Text>
          
          {result.predictions.map((prediction, index) => {
            const disease = getDiseaseById(prediction.className);
            if (!disease) return null;
            
            // Calculate relative confidence for visualization
            // This shows what percentage of the total confidence this prediction represents
            const relativeConfidence = totalConfidence > 0 
              ? prediction.probability / totalConfidence 
              : 0;
            
            return (
              <Card key={index} style={[
                styles.predictionCard,
                index === 0 && styles.topPredictionCard
              ]}>
                <View style={styles.predictionHeader}>
                  <Text style={styles.diseaseName}>
                    {disease.name}
                    {index === 0 && <Text style={styles.topMatch}> (Top Match)</Text>}
                  </Text>
                  <Text style={styles.confidenceText}>
                    {Math.round(prediction.probability * 100)}%
                  </Text>
                </View>
                
                <ConfidenceBar confidence={prediction.probability} />
                
                <Text style={styles.diseaseDescription} numberOfLines={3}>
                  {disease.description}
                </Text>
                
                <View style={styles.symptomsContainer}>
                  <Text style={styles.symptomsTitle}>Key Symptoms:</Text>
                  <View style={styles.symptomsList}>
                    {disease.symptoms.slice(0, 3).map((symptom, i) => (
                      <View key={i} style={styles.symptomItem}>
                        <View style={styles.symptomBullet} />
                        <Text style={styles.symptomText}>{symptom}</Text>
                      </View>
                    ))}
                    {disease.symptoms.length > 3 && (
                      <Text style={styles.moreSymptoms}>+{disease.symptoms.length - 3} more</Text>
                    )}
                  </View>
                </View>
                
                <Button
                  title="View Complete Details"
                  onPress={() => handleViewDiseaseDetails(disease.id)}
                  variant={index === 0 ? "primary" : "outline"}
                  size="small"
                  icon={<ChevronRight size={16} color={index === 0 ? colors.white : colors.primary} />}
                  style={styles.viewDetailsButton}
                />
              </Card>
            );
          })}
          
          <View style={styles.disclaimerContainer}>
            <AlertTriangle size={16} color={colors.warning} />
            <Text style={styles.disclaimerText}>
              This analysis is based on machine learning and should not be considered a medical diagnosis. 
              Please consult a healthcare professional for proper evaluation.
            </Text>
          </View>
          
          <Button
            title="Scan New Image"
            onPress={() => router.push('/scan')}
            style={styles.scanButton}
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    marginBottom: 16,
  },
  backButton: {
    minWidth: 120,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  metadataContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  metadataText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  predictionCard: {
    marginBottom: 16,
    padding: 16,
  },
  topPredictionCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
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
  topMatch: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.primary,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  diseaseDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 12,
    marginBottom: 16,
    lineHeight: 20,
  },
  symptomsContainer: {
    marginBottom: 16,
  },
  symptomsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  symptomsList: {
    marginLeft: 8,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  symptomBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 8,
  },
  symptomText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  moreSymptoms: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start',
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  disclaimerText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
  scanButton: {
    marginBottom: 24,
  },
}); 