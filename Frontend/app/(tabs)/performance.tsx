import { StyleSheet, View } from 'react-native';
import { PerformanceDisplay } from '@/components/Performance/PerformanceDisplay';
import { Colors } from '@/constants/Colors';

export default function PerformanceScreen() {
  return (
    <View style={styles.container}>
      <PerformanceDisplay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors['light'].background,
  },
});
