const ContractTemplate = require("../models/ContractTemplate");
const Contract = require("../models/Contract");
const docxGenerator = require("../services/docxGenerator");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.generateContract = async (req, res) => {
  const { templateId, formData } = req.body;

  try {
    // Récupérer le template
    const template = await ContractTemplate.findById(templateId);
    if (!template)
      return res.status(404).json({ error: "Template non trouvé" });

    // Générer le nouveau contrat
    const outputFileName = `contrat_${Date.now()}.docx`;
    const outputPath = path.join(
      __dirname,
      "../generated-contracts",
      outputFileName
    );

    await docxGenerator.generateContract(
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
    const contract = new Contract({
      template: templateId,
      user: req.user._id,
      data: formData,
      generatedFilePath: outputPath,
      paymentIntentId: paymentIntent.id,
      status: "pending_payment",
    });
    await contract.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      contractId: contract._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
