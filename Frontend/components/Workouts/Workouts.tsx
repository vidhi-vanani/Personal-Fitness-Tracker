import React, { useState } from 'react';
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

const daysOfWeek = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

// List of workouts
const workoutList = [
  {
    id: '1',
    title: 'Pushups',
    sets: '3',
    reps: '10',
    details: 'Pushups are a great full-body exercise targeting chest, shoulders, triceps, and core.',
  },
  {
    id: '2',
    title: 'Squats',
    sets: '4',
    reps: '12',
    details: 'Squats are a compound exercise that targets the lower body.',
  },
  {
    id: '3',
    title: 'Plank',
    sets: '2',
    reps: '30s',
    details: 'Planks are a great full-body exercise that target multiple muscle groups.',
  },
  {
    id: '4',
    title: 'Push Press',
    sets: '3',
    reps: '10',
    details: 'Push Press is a compound exercise that targets the upper body, including the chest, shoulders, and triceps.',
  },
  {
    id: '5',
    title: 'Deadlift',
    sets: '4',
    reps: '12',
    details: 'Deadlifts are a compound exercise that targets the lower body.',
  },
  {
    id: '6',
    title: 'Traditional Pullups',
    sets: '4',
    reps: '12',
    details: 'Traditional pullups are a compound exercise that targets the upper body, including the back, shoulders, and biceps.',
  },
  {
    id: '7',
    title: 'Traditional Pushups',
    sets: '4',
    reps: '12',
    details: 'Traditional pushups are a compound exercise that targets the upper body, including the chest, shoulders, and triceps.',
  },
  {
    id: '8',
    title: 'Traditional Deadlifts',
    sets: '4',
    reps: '12',
    details: 'Traditional deadlifts are a compound exercise that targets the lower body.',
  },
];

const workoutListByDay: Record<string, any[]> = {
  'M': [workoutList[0], workoutList[1]],
  'Tu': [workoutList[2]],
  'W': [workoutList[3]],
  'Th': [workoutList[4]],
  'F': [workoutList[0]],
  'Sa': [workoutList[1]],
  'Su': [workoutList[2]],
};
export const Workouts = () => {
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);
  const [showWorkoutDrawer, setShowWorkoutDrawer] = useState(false);
  const [workouts, setWorkouts] = useState(workoutListByDay);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [editSets, setEditSets] = useState('');
  const [editReps, setEditReps] = useState('');

  const handleEditWorkout = (workout: any) => {
    setSelectedWorkout(workout);
    setEditSets(workout.sets);
    setEditReps(workout.reps);
    setIsEditModalVisible(true);
  };

  const handleUpdateWorkout = () => {
    if (!selectedWorkout) return;

    if (isNaN(Number(editSets)) || Number(editSets) <= 0 || Number(editSets) > 10) {
      alert('Sets must be between 1 and 10');
      return;
    }
    
    const updatedWorkouts = {
      ...workouts,
      [selectedDay]: workouts[selectedDay].map((w: any) => 
        w.id === selectedWorkout.id ? { ...w, sets: editSets, reps: editReps } : w
      )
    };
    
    setWorkouts(updatedWorkouts);
    setIsEditModalVisible(false);
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
          <TouchableOpacity style={styles.iconButton} onPress={() => handleEditWorkout(item)}>
            <Ionicons name="pencil" size={20} color={Colors.light.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="trash" size={20} color={Colors.light.tint} onPress={() => handleDeleteWorkout(item)}/>
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

  const handleAddWorkout = (workout: any) => {
    if(workouts[selectedDay].find((w: any) => w.id === workout.id)) {
      setShowWorkoutDrawer(false);
      return;
    }
    setWorkouts({...workouts, [selectedDay]: [...workouts[selectedDay], workout]});
    setShowWorkoutDrawer(false);
  };

  const handleDeleteWorkout = (workout: any) => {
    setWorkouts({...workouts, [selectedDay]: workouts[selectedDay].filter((w: any) => w.id !== workout.id)});
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
          data={workouts[selectedDay]}
          renderItem={renderWorkoutItemForTheDay}
          keyExtractor={(item) => item.id}
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
              data={workoutList}
              renderItem={renderWorkoutListItem}
              keyExtractor={(item) => item.id}
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
  updateButtonText:  {
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
