import mqtt from "mqtt";
import SensorData from "../models/SensorData.js";

const brokerUrl = "mqtts://9c08f399db6346baa14ad6844a6643d1.s1.eu.hivemq.cloud:8883";

const client = mqtt.connect(brokerUrl, {
  username: "Stephen",
  password: "Dragibus1",
  clientId: "backend_" + Math.random().toString(16).substring(2, 10),
  clean: true,
  reconnectPeriod: 2000
});

client.on("connect", () => {
  console.log("🔥 Connecté à HiveMQ Cloud (sécurisé) !");

  client.subscribe("agriculture/sensors", (err) => {
    if (err) console.error("❌ Erreur abonnement :", err);
    else console.log("📡 Souscription : agriculture/sensors");
  });
});

// Quand un message MQTT arrive
client.on("message", async (topic, message) => {
  console.log("📥 MQTT Message reçu :", message.toString());

  try {
    const payload = JSON.parse(message.toString());

    await SensorData.create({
      temperature: payload.temperature,
      humidity: payload.humidity,
      light: payload.light
    });

    console.log("💾 Données enregistrées en BDD !");
  } catch (e) {
    console.error("❌ Erreur traitement MQTT :", e.message);
  }
});

export default client;
