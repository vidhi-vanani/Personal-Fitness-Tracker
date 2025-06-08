import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { BASE_URL } from '@/constants/api';

const daysOfWeek = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

export type Workout = {
  _id: string;
  title: string;
  sets: string;
  reps: string;
  details: string;
  days: string[];
  status: {
    [day: string]: boolean;
  }
}

export const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [showWorkoutDrawer, setShowWorkoutDrawer] = useState(false);
  const [workoutsByDay, setWorkoutsByDay] = useState<Workout[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [editSets, setEditSets] = useState('');
  const [editReps, setEditReps] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/workouts`);
      setWorkouts(response.data);
    } catch (err) {
      alert("Failed to fetch workouts");
    }
  };

  useEffect(() => {
    fetchWorkoutsByDay();
  }, [selectedDay]);

  const fetchWorkoutsByDay = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/workouts/${selectedDay}`);
      setWorkoutsByDay(response.data);
    } catch (err) {
      alert("Failed to fetch workouts");
    }
  };

  const openEditWorkoutModal = (workout: any) => {
    setSelectedWorkout(workout);
    setEditSets(workout.sets);
    setEditReps(workout.reps);
    setIsEditModalVisible(true);
  };

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

  const renderWorkoutItemForTheDay = ({ item }: { item: any }) => {
    return (
      <View style={styles.workoutItem}>
        <Icon name="weight-lifter" style={styles.workoutImage} color={Colors.light.icon} />
        <View style={styles.workoutDetails}>
          <Text style={styles.workoutTitle}>{item.title}</Text>
          <Text style={styles.workoutSubtitle}>{item.sets} x {item.reps}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => openEditWorkoutModal(item)}>
            <Ionicons name="pencil" size={20} color={Colors.light.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="trash" size={20} color={Colors.light.tint} onPress={() => handleDeleteWorkout(item)} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderWorkoutListItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.workoutItem}
        onPress={() => handleAddWorkout(item)}
      >
        <Icon name="weight-lifter" style={styles.workoutImage} color={Colors.light.icon} />
        <View style={styles.workoutDetails}>
          <Text style={styles.workoutTitle}>{item.title}</Text>
          <Text style={styles.workoutSubtitle}>{item.details}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleAddWorkout = (workout: Workout) => {
    workout.days = [...workout.days, selectedDay];
    if (workoutsByDay.find((w: Workout) => w._id === workout._id)) {
      setShowWorkoutDrawer(false);
      return;
    }
    try {
      axios.put(`${BASE_URL}/api/workouts/${workout._id}`, workout);
      setWorkoutsByDay([...workoutsByDay, workout]);
    } catch (err) {
      alert("Failed to add workout");
    }
    setShowWorkoutDrawer(false);
  };

  const handleUpdateWorkout = () => {
    if (!selectedWorkout) return;

    if (isNaN(Number(editSets)) || Number(editSets) <= 0 || Number(editSets) > 10) {
      alert('Sets must be between 1 and 10');
      return;
    }

    const updatedWorkout = {
      ...selectedWorkout,
      sets: editSets,
      reps: editReps,
    };

    const updatedWorkouts = workoutsByDay.map((w: Workout) =>
      w._id === selectedWorkout._id ? updatedWorkout : w
    );

    axios.put(`${BASE_URL}/api/workouts/${updatedWorkout._id}`, updatedWorkout);
    setWorkoutsByDay(updatedWorkouts);
    setIsEditModalVisible(false);
  };

  const handleDeleteWorkout = (workout: Workout) => {
    workout.days = workout.days.filter((day: string) => day !== selectedDay);
    try {
      axios.put(`${BASE_URL}/api/workouts/${workout._id}`, workout);
      setWorkoutsByDay(workoutsByDay.filter((w: Workout) => w._id !== workout._id));
    } catch (err) {
      alert("Failed to delete workout");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Workout</Text>
            <Text style={styles.modalSubtitle}>{selectedWorkout?.title}</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Sets:</Text>
              <TextInput
                style={styles.input}
                value={editSets}
                onChangeText={setEditSets}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Reps:</Text>
              <TextInput
                style={styles.input}
                value={editReps}
                onChangeText={setEditReps}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.updateButton]}
                onPress={handleUpdateWorkout}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.content}>
        <View style={styles.daySelectorContainer}>
          {daysOfWeek.map(renderDayButton)}
        </View>
        <FlatList
          data={workoutsByDay}
          renderItem={renderWorkoutItemForTheDay}
          keyExtractor={(item) => item._id}
          style={styles.workoutList}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setShowWorkoutDrawer(true)}>
        <Ionicons name="add-circle" size={40} color={Colors.light.tint} />
      </TouchableOpacity>

      {/* Workout Selection Drawer */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showWorkoutDrawer}
        onRequestClose={() => setShowWorkoutDrawer(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowWorkoutDrawer(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Workout</Text>
            <FlatList
              data={workouts}
              renderItem={renderWorkoutListItem}
              keyExtractor={(item) => item._id}
              style={styles.workoutList}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: Colors.light.text,
    fontWeight: 'bold',
  },
  daySelectorContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 8,
    marginHorizontal: 30,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
    margin: 10,
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  modalTitle: {
    color: Colors.light.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalSubtitle: {
    color: Colors.light.tint,
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputLabel: {
    color: Colors.light.text,
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: Colors.light.border,
  },
  updateButton: {
    backgroundColor: Colors.light.tint,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButtonText: {
    color: Colors.light.text,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
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

export default Workouts;
