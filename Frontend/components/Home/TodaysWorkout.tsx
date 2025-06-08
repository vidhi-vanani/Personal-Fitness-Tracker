import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { Workout } from '@/components/Workouts/Workouts';
import { BASE_URL } from '@/constants/api';

const daysOfWeek = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

export const TodaysWorkout = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const day = daysOfWeek[new Date().getDay()];

  // Check if it's Sunday and reset statuses
  // useEffect(() => {
  //   const checkAndResetStatuses = async () => {
  //     const now = new Date();
  //     if (now.getDay() === 0) { // Sunday
  //       try {
  //         await axios.post(`${BASE_URL}/api/workouts/status/reset`);
  //       } catch (error) {
  //         console.error('Failed to reset statuses:', error);
  //       }
  //     }
  //   };

  //   // Check once when component mounts
  //   checkAndResetStatuses();

  //   // Set up a timer to check every hour
  //   const timer = setInterval(checkAndResetStatuses, 3600000); // 1 hour
  //   return () => clearInterval(timer);
  // }, []);

  const handleCompleteWorkout = (workout: Workout, completed: boolean) => {
    setWorkouts(workouts.map((w: Workout) =>
      w._id === workout._id ? { ...w, status: { ...w.status, [day]: completed } } : w
    ));
    try {
      axios.put(`${BASE_URL}/api/workouts/${workout._id}`, { status: { ...workout.status, [day]: completed } });
    } catch (err) {
      alert("Failed to update workout status");
    }
  };

  useEffect(() => {
    if(workouts.length > 0 && workouts.every((w: Workout) => (w.status && w.status[day] != undefined && w.status[day] == true))) {
      setShowConfetti(true);
    }
  }, [workouts]);

  // Fetch workouts on initial mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Fetch workouts when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchWorkouts();
      return () => {};
    }, [])
  );

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/workouts/${day}`);
      setWorkouts(response.data);
    } catch (err) {
      alert("Failed to fetch workouts");
    }
  };

  const renderWorkoutListItem = ({ item }: { item: Workout }) => {
    return (
      <TouchableOpacity
        style={styles.workoutItem}
      >
        <Icon name="weight-lifter" style={styles.workoutImage} color={Colors.light.icon} />
        <View style={styles.workoutDetails}>
          <Text style={styles.workoutTitle}>{item.title}</Text>
          <Text style={styles.workoutSubtitle}>{item.sets} x {item.reps}</Text>
        </View>
        {  item.status != undefined && item.status[day] != undefined && item.status[day] ?
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
      keyExtractor={(item) => item._id}
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
