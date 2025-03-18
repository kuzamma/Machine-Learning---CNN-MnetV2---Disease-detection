 import React from 'react';import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
 import { useRouter } from 'expo-router';
 import { Trash2 } from 'lucide-react-native';
 import colors from '@/constants/colors';
 import Button from '@/components/Button';
 import EmptyState from '@/components/EmptyState';
 import { useResultsStore, PredictionResult } from '@/stores/results-store';
 import { getDiseaseById } from '@/constants/diseases';


 
 export default function HistoryScreen() {
  const router = useRouter();
  const results = useResultsStore(state => state.results);
  const clearResults = useResultsStore(state => state.clearResults);
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  const handleViewResult = (resultId: string) => {
    router.push({
      pathname: '/result-details',
      params: { id: resultId }
    });
  };
  const renderItem = ({ item }: { item: PredictionResult }) => {
    const topPrediction = item.predictions[0];
    const disease = getDiseaseById(topPrediction.className);
    
    if (!disease) return null;
    
    return (
      <TouchableOpacity 
        style={styles.resultItem}
        onPress={() => handleViewResult(item.id)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.imageUri }} style={styles.resultImage} />
        <View style={styles.resultInfo}>
          <Text style={styles.resultName}>{disease.name}</Text>
          <Text style={styles.resultConfidence}>
            Confidence: {Math.round(topPrediction.probability * 100)}%
          </Text>
          <Text style={styles.resultDate}>{formatDate(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  if (results.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          title="No History"
          description="You haven't scanned any images yet. Start by scanning an image to see your history here."
          buttonTitle="Scan Image"
          onButtonPress={() => router.push('/scan')}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
    <View style={styles.header}>
    <Text style={styles.title}>Scan History</Text>
    <Button
    title="Clear All"
    onPress={clearResults}
    variant="outline"
    size="small"
    icon={<Trash2 size={16} color={colors.primary} />}
    />
    </View>
    <FlatList
    data={results}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    contentContainerStyle={styles.listContent}
    showsVerticalScrollIndicator={false}
    />
    </SafeAreaView>
    );
    }







const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      paddingBottom: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
    },
    listContent: {
      padding: 16,
      paddingTop: 8,
    },
    resultItem: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    resultImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 12,
    },
    resultInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    resultName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    resultConfidence: {
      fontSize: 14,
      color: colors.textLight,
      marginBottom: 4,
    },
    resultDate: {
      fontSize: 12,
      color: colors.textLight,
    },
  });