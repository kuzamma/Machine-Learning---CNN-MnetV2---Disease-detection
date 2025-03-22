import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Linking, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AlertTriangle, ChevronRight, ExternalLink, Github, Info, Shield, Cpu, Zap } from 'lucide-react-native';
import colors from '@/constants/colors';
import Card from '@/components/Card';
import ModelInfo from '@/components/ModelInfo';

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [saveHistory, setSaveHistory] = React.useState(true);
  const [useGPU, setUseGPU] = React.useState(Platform.OS !== 'web');
  const [highAccuracy, setHighAccuracy] = React.useState(false);

  const toggleDarkMode = () => setDarkMode(previousState => !previousState);
  const toggleNotifications = () => setNotifications(previousState => !previousState);
  const toggleSaveHistory = () => setSaveHistory(previousState => !previousState);
  const toggleUseGPU = () => setUseGPU(previousState => !previousState);
  const toggleHighAccuracy = () => setHighAccuracy(previousState => !previousState);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const navigateToModelInfo = () => {
    router.push('/model-info');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Card>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={darkMode ? colors.primary : colors.white}
            />
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={notifications ? colors.primary : colors.white}
            />
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Save Scan History</Text>
            <Switch
              value={saveHistory}
              onValueChange={toggleSaveHistory}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={saveHistory ? colors.primary : colors.white}
            />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Model Settings</Text>
        <Card>
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Cpu size={20} color={colors.text} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingLabel}>Use GPU Acceleration</Text>
                <Text style={styles.settingDescription}>
                  Faster processing but uses more battery
                </Text>
              </View>
            </View>
            <Switch
              value={useGPU}
              onValueChange={toggleUseGPU}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={useGPU ? colors.primary : colors.white}
              disabled={Platform.OS === 'web'}
            />
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Zap size={20} color={colors.text} style={styles.settingIcon} />
              <View>
                <Text style={styles.settingLabel}>High Accuracy Mode</Text>
                <Text style={styles.settingDescription}>
                  More accurate but slower processing
                </Text>
              </View>
            </View>
            <Switch
              value={highAccuracy}
              onValueChange={toggleHighAccuracy}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={highAccuracy ? colors.primary : colors.white}
            />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Model Information</Text>
        <TouchableOpacity onPress={navigateToModelInfo}>
          <ModelInfo 
            name="MobileNetV2-DiseaseDetection"
            version="1.0.0"
            inputShape={[224, 224, 3]}
            quantized={true}
            accuracyMetrics={{
              precision: 0.89,
              recall: 0.87,
              f1Score: 0.88
            }}
          />
          <View style={styles.viewMoreContainer}>
            <Text style={styles.viewMoreText}>View detailed model information</Text>
            <ChevronRight size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>About</Text>
        <Card>
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => openLink('https://github.com/tensorflow/tensorflow')}
          >
            <View style={styles.linkItemLeft}>
              <Github size={20} color={colors.text} style={styles.linkIcon} />
              <Text style={styles.linkLabel}>TensorFlow</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => openLink('https://www.tensorflow.org/lite')}
          >
            <View style={styles.linkItemLeft}>
              <ExternalLink size={20} color={colors.text} style={styles.linkIcon} />
              <Text style={styles.linkLabel}>TensorFlow Lite Documentation</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => openLink('https://expo.dev')}
          >
            <View style={styles.linkItemLeft}>
              <ExternalLink size={20} color={colors.text} style={styles.linkIcon} />
              <Text style={styles.linkLabel}>Built with Expo</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Legal</Text>
        <Card>
          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.linkItemLeft}>
              <Shield size={20} color={colors.text} style={styles.linkIcon} />
              <Text style={styles.linkLabel}>Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.linkItemLeft}>
              <Info size={20} color={colors.text} style={styles.linkIcon} />
              <Text style={styles.linkLabel}>Terms of Service</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </TouchableOpacity>
        </Card>

       

        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  settingDescription: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: {
    marginRight: 12,
  },
  linkLabel: {
    fontSize: 16,
    color: colors.text,
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
  versionText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  viewMoreText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
});