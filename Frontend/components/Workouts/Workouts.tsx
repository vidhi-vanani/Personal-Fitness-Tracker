import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const daysOfWeek = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

// Sample workout data - replace with actual data
const sampleWorkouts = [
  {
    id: '1',
    title: 'Pushups',
    reps: '3x10',
  },
  {
    id: '2',
    title: 'Squats',
    reps: '4x12',
  },
  {
    id: '3',
    title: 'Plank',
    reps: '2x30s',
  },
  {
    id: '1',
    title: 'Pushups',
    reps: '3x10',
  },
  {
    id: '2',
    title: 'Squats',
    reps: '4x12',
  },
  {
    id: '3',
    title: 'Plank',
    reps: '2x30s',
  },
  {
    id: '1',
    title: 'Pushups',
    reps: '3x10',
  },
  {
    id: '2',
    title: 'Squats',
    reps: '4x12',
  },
  {
    id: '3',
    title: 'Plank',
    reps: '2x30s',
  },
];

export const Workouts = () => {
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);

  const renderDayButton = (day: string) => {
    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.dayButton,
          selectedDay === day && styles.selectedDayButton,
        ]}
        onPress={() => setSelectedDay(day)}
      >
        <Text style={[styles.dayButtonText, selectedDay === day && styles.selectedDayButtonText]}>
          {day}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderWorkoutItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.workoutItem}>
        <Icon name="weight-lifter" style={styles.workoutImage} color={Colors.light.icon} />
        <View style={styles.workoutDetails}>
          <Text style={styles.workoutTitle}>{item.title}</Text>
          <Text style={styles.workoutSubtitle}>{item.reps}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="pencil" size={20} color={Colors.light.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="trash" size={20} color={Colors.light.tint} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.daySelectorContainer}>
          {daysOfWeek.map(renderDayButton)}
        </View>
        <FlatList
          data={sampleWorkouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
          style={styles.workoutList}
        />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle" size={40} color={Colors.light.tint} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  daySelectorContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 8,
    margin: 10,
  },
  dayButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  selectedDayButton: {
    backgroundColor: Colors.light.tint,
  },
  dayButtonText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  selectedDayButtonText: {
    color: Colors.light.background,
  },
  workoutList: {
    flex: 1,
    marginVertical: 10,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  workoutImage: {
    marginRight: 10,
    fontSize: 24,
  },
  workoutDetails: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  workoutSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconButton: {
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 50,
    elevation: 5,
  },
});
