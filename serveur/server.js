const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const uploadRoutes = require("./routes/uploads");
const ContratRoutes = require("./routes/ContratRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sert les fichiers statiques (.docx)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", uploadRoutes); // Résultat : POST /api/upload-template
app.use("api/contrat", ContratRoutes);
// Route de test
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// Connexion MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Démarrage du serveur (doit venir à la fin !)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
