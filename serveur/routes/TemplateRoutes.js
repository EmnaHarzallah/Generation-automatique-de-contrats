// routes/contratTemplates.js

const express = require("express");
const router = express.Router();
const ContratTemplate = require("../Models/ContratTemplate"); // adapte le chemin

router.get("/", async (req, res) => {
  try {
    const templates = await ContratTemplate.find({});
    res.json(templates);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des templates." });
  }
});

module.exports = router;
