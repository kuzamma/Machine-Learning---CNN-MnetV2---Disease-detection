import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import colors from '@/constants/colors';

interface Step {
  id: string;
  label: string;
  duration: number;
}

interface ProcessingStepsProps {
  onComplete?: () => void;
}

export default function ProcessingSteps({ onComplete }: ProcessingStepsProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps: Step[] = [
    { id: 'load', label: 'Loading image', duration: 800 },
    { id: 'preprocess', label: 'Preprocessing image', duration: 1200 },
    { id: 'inference', label: 'Running inference', duration: 1500 },
    { id: 'analyze', label: 'Analyzing results', duration: 1000 },
  ];

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      // All steps completed
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const currentStep = steps[currentStepIndex];
    
    const timer = setTimeout(() => {
      // Mark current step as completed
      setCompletedSteps(prev => [...prev, currentStep.id]);
      
      // Move to next step
      setCurrentStepIndex(prev => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [currentStepIndex, steps, onComplete]);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isActive = index === currentStepIndex;
        
        return (
          <View key={step.id} style={styles.stepRow}>
            <View style={[
              styles.stepIndicator,
              isCompleted ? styles.stepCompleted : (isActive ? styles.stepActive : {})
            ]}>
              {isCompleted && <Check size={16} color={colors.white} />}
            </View>
            <Text style={[
              styles.stepLabel,
              isCompleted ? styles.stepLabelCompleted : (isActive ? styles.stepLabelActive : {})
            ]}>
              {step.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepActive: {
    backgroundColor: colors.primaryLight,
  },
  stepCompleted: {
    backgroundColor: colors.success,
  },
  stepLabel: {
    fontSize: 16,
    color: colors.textLight,
  },
  stepLabelActive: {
    color: colors.primary,
    fontWeight: '500',
  },
  stepLabelCompleted: {
    color: colors.text,
    fontWeight: '500',
  },
});