import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    weight: { type: Number, required: true },
    fat: { type: Number, required: true },
    mass: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.model('progress', progressSchema);