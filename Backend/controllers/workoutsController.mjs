import Workouts from '../models/workouts.mjs';

export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workouts.find();
    res.json(workouts);
  } catch (error) {
    console.error('Error getting workouts:', error);
    res.status(500).json({ message: 'Error retrieving workouts', error: error.message });
  }
};

export const getWorkoutsByDay = async (req, res) => {
    try {
        const workouts = await Workouts.find({ days: req.params.day });
        res.json(workouts);
    } catch (error) {
        console.error('Error getting workouts:', error);
        res.status(500).json({ message: 'Error retrieving workouts', error: error.message });
    }
}

export const updateWorkout = async (req, res) => {
    try {
        const updatedWorkout = await Workouts.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedWorkout);
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ message: 'Error updating workout', error: error.message });
    }
}

export const createWorkout = async (req, res) => {
  try {
    const newWorkout = new Workouts(req.body);
    const saved = await newWorkout.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Error creating workout', error: error.message });
  }
};