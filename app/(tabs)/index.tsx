import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, FileImage, Info } from 'lucide-react-native';
import colors from '@/constants/colors';
import Button from '@/components/Button';
import Card from '@/components/Card';
export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Plant Disease Detection</Text>
          <Text style={styles.subtitle}>
            Detect diseases from images using Convolutional Neural Network (CNN)
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/cover.png')} // Use require for local images
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.actionsContainer}>
          <Button
            title="Take a Photo"
            onPress={() => router.push('/scan')}
            icon={<Camera size={20} color={colors.white} />}
            style={styles.button}
          />
          <Button
            title="Choose from Gallery"
            onPress={() => router.push('/scan?source=gallery')}
            variant="outline"
            icon={<FileImage size={20} color={colors.primary} />}
            style={styles.button}
          />
        </View>


        <Text style={styles.sectionTitle}>How It Works</Text>
        <Card>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Capture or Select Image</Text>
              <Text style={styles.stepDescription}>
                Take a photo or select an image from your gallery
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}> Analysis</Text>
              <Text style={styles.stepDescription}>
                Our model analyzes the image to detect potential diseases
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>View Results</Text>
              <Text style={styles.stepDescription}>
                Get detailed information about the detected disease
              </Text>
            </View>
          </View>
        </Card>


        
      </ScrollView>
    </SafeAreaView>
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    marginBottom: 32,
  },
  button: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  disclaimerText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
});