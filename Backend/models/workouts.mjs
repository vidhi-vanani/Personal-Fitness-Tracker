import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  details: { type: String, required: true },
  days: { type: Array, required: true },
  status: { type: Object, default: {} }, // Stores completion status for each day
}, { timestamps: true });

export default mongoose.model('workouts', workoutSchema);
