import Progress from '../models/progress.mjs';

export const getAllDataPoints = async (req, res) => {
  try {
    const progress = await Progress.find().sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    console.error('Error getting progress:', error);
    res.status(500).json({ message: 'Error retrieving progress data points.', error: error.message });
  }
};

export const createDataPoint = async (req, res) => {
  try {
    const newProgress = new Progress(req.body);
    const saved = await newProgress.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating progress:', error);
    res.status(500).json({ message: 'Error creating progress data point.', error: error.message });
  }
};

export const deleteDataPoint = async (req, res) => {
  try {
    const deleted = await Progress.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (error) {
    console.error('Error deleting progress:', error);
    res.status(500).json({ message: 'Error deleting progress data point.', error: error.message });
  }
};