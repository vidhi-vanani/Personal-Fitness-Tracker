import { StyleSheet, Text, View } from 'react-native';
import { Workouts } from '@/components/Workouts/Workouts';
import { Colors } from '@/constants/Colors';

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Workouts />
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
