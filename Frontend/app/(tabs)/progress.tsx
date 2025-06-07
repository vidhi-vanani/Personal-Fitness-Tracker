import { StyleSheet, View } from 'react-native';
import { Progress } from '@/components/Progress/Progress';
import { Colors } from '@/constants/Colors';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Progress />
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
