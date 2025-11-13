import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import "./mqtt/mqttClient.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use("/api/test", testRoutes);

//
app.use("/api/auth", authRoutes);

//
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Route protégée OK", user: req.user });
});

//
app.use("/api/sensor", sensorRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur en écoute sur le port ${PORT}`));
