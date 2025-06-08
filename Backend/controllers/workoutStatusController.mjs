import Workout from '../models/workouts.mjs';

export const resetWeeklyStatus = async (req, res) => {
  try {
    // Get all workouts
    const workouts = await Workout.find();
    
    // Reset status for all workouts
    for (const workout of workouts) {
      workout.status = {}; // Clear all statuses
      await workout.save();
    }
    
    res.json({ message: 'Weekly status reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
