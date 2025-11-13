import mqtt from "mqtt";
import SensorData from "../models/SensorData.js";

const brokerUrl = "mqtts://9c08f399db6346baa14ad6844a6643d1.s1.eu.hivemq.cloud:8883";

const client = mqtt.connect(brokerUrl, {
  clientId: "backend_" + Math.random().toString(16).substr(2, 8),
  clean: true,
  reconnectPeriod: 2000
});

client.on("connect", () => {
  console.log("🔥 Connecté au broker MQTT HiveMQ");

  // S’abonner au topic envoyé par l’ESP32
  client.subscribe("agriculture/sensors", (err) => {
    if (!err) {
      console.log("📡 Souscription au topic : agriculture/sensors");
    }
  });
});

// Quand le backend reçoit un message MQTT
client.on("message", async (topic, message) => {
  console.log("📥 Message reçu :", topic, message.toString());

  try {
    const payload = JSON.parse(message.toString());

    // Sauvegarde en BDD
    await SensorData.create({
      temperature: payload.temperature,
      humidity: payload.humidity,
      light: payload.light
    });

    console.log("💾 Données enregistrées dans MongoDB !");
  } catch (err) {
    console.error("❌ Erreur traitement MQTT :", err.message);
  }
});

export default client;
