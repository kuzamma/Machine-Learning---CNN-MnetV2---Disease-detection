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

  // Safety check for predictions array
  if (!result.predictions || !Array.isArray(result.predictions) || result.predictions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No prediction data available</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()} 
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Get only the top prediction
  const topPrediction = result.predictions[0];
  
  // Safety check for prediction object
  if (!topPrediction || !topPrediction.className) {
    console.warn('Invalid prediction object:', topPrediction);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Invalid prediction data</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()} 
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const disease = getDiseaseById(topPrediction.className);
  if (!disease) {
    console.warn(`Disease not found for className: ${topPrediction.className}`);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Disease not found</Text>
          <Button 
            title="Go Back" 
            onPress={() => router.back()} 
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Ensure confidence is between 0 and 1
  const safeConfidence = Math.max(0, Math.min(1, topPrediction.probability));

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

          <Text style={styles.sectionTitle}>Analysis Result</Text>
          
          <Card style={styles.predictionCard}>
            <View style={styles.predictionHeader}>
              <Text style={styles.diseaseName}>{disease.name}</Text>
              </View>
              {/*<Text style={styles.confidenceText}>
                {Math.round(safeConfidence * 100)}%
              </Text>
            </View>
            
            <ConfidenceBar confidence={safeConfidence} /> */}
            
            <Text style={styles.diseaseDescription}>
              {disease.description}
            </Text>
            
            <View style={styles.symptomsContainer}>
              <Text style={styles.symptomsTitle}>Key Symptoms:</Text>
              <View style={styles.symptomsList}>
                {disease.symptoms.map((symptom, i) => (
                  <View key={i} style={styles.symptomItem}>
                    <View style={styles.symptomBullet} />
                    <Text style={styles.symptomText}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <Button
              title="View Complete Details"
              onPress={() => handleViewDiseaseDetails(disease.id)}
              icon={<ChevronRight size={16} color={colors.white} />}
              style={styles.viewDetailsButton}
            />
          </Card>
          
         
          
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