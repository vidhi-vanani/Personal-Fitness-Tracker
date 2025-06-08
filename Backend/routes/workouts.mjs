import express from 'express';
import { 
    getAllWorkouts, 
    getWorkoutsByDay, 
    updateWorkout 
} from '../controllers/workoutsController.mjs';

const workoutsRouter = express.Router();

workoutsRouter.get('/', getAllWorkouts);
workoutsRouter.get('/:day', getWorkoutsByDay);
workoutsRouter.put('/:id', updateWorkout);

export default workoutsRouter;