const Signature = require("../Models/Signature");
const Contrat = require("../Models/Contrat");

async function createSignature(req, res) {
  const { contratId, signature, userId } = req.body;

  if (!contratId || !signature || !userId) {
    return res
      .status(400)
      .json({ error: "Paramètres manquants (contratId, signature, userId)" });
  }

  try {
    const contrat = await Contrat.findById(contratId);
    if (!contrat) {
      return res.status(404).json({ error: "Contrat non trouvé" });
    }

    const newSignature = new Signature({
      contrat: contratId,
      user: userId,
      image: signature,
      signature_date: new Date(),
      status: "signé",
    });

    await newSignature.save();

    res.status(201).json(newSignature);
  } catch (err) {
    console.error("Erreur création signature :", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createSignature };
