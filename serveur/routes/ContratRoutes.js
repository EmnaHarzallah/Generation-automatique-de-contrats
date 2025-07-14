const express = require("express");
const router = express.Router();
const ContratController = require("../controllers/ContratController");

router.post("/generate", ContratController.generateContrat);

router.get("/:id/download", async (req, res) => {
  try {
    const Contrat = await Contrat.findById(req.params.id);
    if (!Contrat) return res.status(404).send("Contrat non trouvé");

    res.download(Contrat.generatedFilePath);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/templates", ContratController.getTemplate);

module.exports = router;
