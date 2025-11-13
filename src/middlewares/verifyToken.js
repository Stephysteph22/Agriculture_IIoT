import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Vérifie présence du header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Accès refusé : token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Vérifie validité du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajoute l'utilisateur au req
    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({ error: "Token invalide" });
  }
}
