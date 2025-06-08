import express from 'express';
import { 
    resetWeeklyStatus,
} from '../controllers/workoutStatusController.mjs';

const workoutStatusRouter = express.Router();

workoutStatusRouter.post('/reset', resetWeeklyStatus);

export default workoutStatusRouter;