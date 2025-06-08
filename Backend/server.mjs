import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/conn.mjs';
import workoutsRouter from './routes/workouts.mjs';
import progressRouter from './routes/progress.mjs';
import workoutStatusRouter from './routes/workoutStatusRouter.mjs';

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json());

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/workouts', workoutsRouter);
app.use('/api/progress', progressRouter);
app.use('/api/workouts/status', workoutStatusRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 