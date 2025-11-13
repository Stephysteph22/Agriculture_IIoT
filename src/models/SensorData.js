import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  light: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("SensorData", sensorSchema);
