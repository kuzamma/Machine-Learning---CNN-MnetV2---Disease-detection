import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { X } from 'lucide-react-native';
import colors from '@/constants/colors';

interface ImagePreviewProps {
  uri: string;
  onRemove: () => void;
}

export default function ImagePreview({ uri, onRemove }: ImagePreviewProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <X size={20} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ready for analysis</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  footerText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});