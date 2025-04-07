import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Disease } from '@/constants/diseases';
import Card from './Card';
import ConfidenceBar from './ConfidenceBar';
import colors from '@/constants/colors';
import { ChevronRight } from 'lucide-react-native';
import { adjustConfidence } from '@/utils/confidence-utils';

interface DiseaseCardProps {
  disease: Disease;
  confidence: number;
}

export default function DiseaseCard({ disease, confidence }: DiseaseCardProps) {
  const router = useRouter();

  // Adjust confidence to be more realistic
  const adjustedConfidence = adjustConfidence(confidence);

  const handlePress = () => {
    router.push({
      pathname: '/disease-details',
      params: { id: disease.id }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: disease.imageUrl }} 
              style={styles.image} 
              resizeMode="cover"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{disease.name}</Text>
            {/*<ConfidenceBar confidence={adjustedConfidence} />*/}
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {disease.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.viewDetails}>View details</Text>
          <ChevronRight size={16} color={colors.primary} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewDetails: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});