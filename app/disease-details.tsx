import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack } from 'expo-router';
import { AlertTriangle } from 'lucide-react-native';
import colors from '@/constants/colors';
import Card from '@/components/Card';
import SectionTitle from '@/components/SectionTitle';
import ListItem from '@/components/ListItem';
import { getDiseaseById } from '@/constants/diseases';

export default function DiseaseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const disease = getDiseaseById(id);

  if (!disease) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Disease information not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: disease.name }} />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: disease.imageUrl }} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <Card>
            <Text style={styles.title}>{disease.name}</Text>
            <Text style={styles.description}>{disease.description}</Text>
          </Card>

          <SectionTitle title="Symptoms" />
          <Card>
            {disease.symptoms.map((symptom, index) => (
              <ListItem key={index} item={symptom} />
            ))}
          </Card>

          <SectionTitle title="Treatment" />
          <Card>
            <Text style={styles.treatmentText}>{disease.treatment}</Text>
          </Card>

          <View style={styles.disclaimerContainer}>
            <AlertTriangle size={16} color={colors.warning} />
            <Text style={styles.disclaimerText}>
              This information is for educational purposes only. Always consult with a healthcare professional for proper diagnosis and treatment.
            </Text>
          </View>
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
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  treatmentText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  disclaimerText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
});