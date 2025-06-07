import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Colors } from '@/constants/Colors';

const workoutList = [
  {
    id: '1',
    title: 'Pushups',
    sets: '3',
    reps: '10',
    completed: true,
  },
  {
    id: '2',
    title: 'Squats',
    sets: '4',
    reps: '12',
    completed: false,
  },
  {
    id: '3',
    title: 'Plank',
    sets: '2',
    reps: '30s',
    completed: false,
  }
];

export const TodaysWorkout = () => {
  const [workouts, setWorkouts] = useState(workoutList);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCompleteWorkout = (workout: any, completed: boolean) => {
    setWorkouts(workouts.map((w: any) =>
      w.id === workout.id ? { ...w, completed } : w
    ));
   
  };

  useEffect(() => {
    if(workouts.every((w: any) => w.completed)) {
      setShowConfetti(true);
    }
  }, [workouts]);
  
  const renderWorkoutListItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.workoutItem}
      >
        <Icon name="weight-lifter" style={styles.workoutImage} color={Colors.light.icon} />
        <View style={styles.workoutDetails}>
          <Text style={styles.workoutTitle}>{item.title}</Text>
          <Text style={styles.workoutSubtitle}>{item.sets} x {item.reps}</Text>
        </View>
        { item.completed ?
          <Icon name="check-circle" size={24} color={Colors.light.icon} onPress={() => handleCompleteWorkout(item, false)}/> :
          <Icon name="check-circle-outline" size={24} color={Colors.light.icon} onPress={() => handleCompleteWorkout(item, true)}/> }
      </TouchableOpacity>
    );
  };
  return (  
  <View style={styles.container}>
    <Text style={styles.headingText}>Hello Vidhi, Today's Workout</Text>
    <FlatList
      data={workouts}
      renderItem={renderWorkoutListItem}
      keyExtractor={(item) => item.id}
    />
    {showConfetti &&
    <ConfettiCannon
          count={200}
          origin={{ x: 200, y:500 }}
          fadeOut
          autoStart
          explosionSpeed={300}
          fallSpeed={3000}
          onAnimationEnd={() => setShowConfetti(false)} // reset after animation
          colors={[Colors.light.tint, Colors.light.tintComplimentary]}
        />}
  </View>);
};

const styles = StyleSheet.create({
  headingText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
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
    marginVertical: 5,
  },
  workoutImage: {
    marginRight: 15,
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
});

export default TodaysWorkout;
