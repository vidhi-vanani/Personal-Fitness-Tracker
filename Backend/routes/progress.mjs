import express from 'express';
import { 
    getAllDataPoints, 
    createDataPoint,
    deleteDataPoint,
} from '../controllers/progressController.mjs';

const progressRouter = express.Router();

progressRouter.get('/', getAllDataPoints);
progressRouter.post('/', createDataPoint);
progressRouter.delete('/:id', deleteDataPoint);

export default progressRouter;