const ContratTemplate = require("../Models/ContratTemplate");
const Contrat = require("../Models/Contrat");
const docxGenerator = require("../services/docxGenerator");
const stripe = require("../config/StripeConfig");

exports.generateContrat = async (req, res) => {
  const { templateId, formData } = req.body;

  try {
    // Récupérer le template
    const template = await ContratTemplate.findById(templateId);
    if (!template)
      return res.status(404).json({ error: "Template non trouvé" });

    // Générer le nouveau contrat
    const outputFileName = `contrat_${Date.now()}.docx`;
    const outputPath = path.join(
      __dirname,
      "../generated-Contrats",
      outputFileName
    );

    await docxGenerator.generateContrat(
      template.filePath,
      outputPath,
      formData
    );

    // Créer l'intention de paiement Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: template.price,
      currency: "eur",
      metadata: { templateId: template._id.toString() },
    });

    // Sauvegarder l'instance du contrat
    const Contrat = new Contrat({
      template: templateId,
      user: req.user._id,
      data: formData,
      generatedFilePath: outputPath,
      paymentIntentId: paymentIntent.id,
      status: "pending_payment",
    });
    await Contrat.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      ContratId: Contrat._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTemplate = async (req, res) => {
  try {
    const template = await ContratTemplate.findById(req.params.id);
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
