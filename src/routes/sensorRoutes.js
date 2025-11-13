import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  addSensorData,
  getAllSensors,
  getSensorById
} from "../controllers/sensorController.js";

const router = express.Router();

router.post("/", verifyToken, addSensorData);
router.get("/", verifyToken, getAllSensors);
router.get("/:id", verifyToken, getSensorById);

export default router;
