import SensorData from "../models/SensorData.js";

// Ajouter des données (POST /api/sensors)
export const addSensorData = async (req, res) => {
  try {
    const { temperature, humidity, light } = req.body;

    const data = await SensorData.create({
      temperature,
      humidity,
      light,
      user: req.user.id
    });

    res.status(201).json({ message: "Données enregistrées", data });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer toutes les données (GET /api/sensors)
export const getAllSensors = async (req, res) => {
  try {
    const data = await SensorData.find({ user: req.user.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer une donnée par ID (GET /api/sensors/:id)
export const getSensorById = async (req, res) => {
  try {
    const data = await SensorData.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ error: "Capteur non trouvé" });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
