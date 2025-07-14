const router = express.Router();
const contractController = require("../controllers/contractController");

router.post("/generate", contractController.generateContract);

router.get("/:id/download", async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).send("Contrat non trouvé");

    res.download(contract.generatedFilePath);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
