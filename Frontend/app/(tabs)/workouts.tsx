import { StyleSheet, Text, View } from 'react-native';
import { WorkoutsDisplay } from '@/components/Workouts/WorkoutsDisplay';
import { Colors } from '@/constants/Colors';

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <WorkoutsDisplay />
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
