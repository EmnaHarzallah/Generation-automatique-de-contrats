const mongoose = require("mongoose");

const SignatureSchema = new mongoose.Schema({
  contrat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contrat",
    required: true,
  },
  signataire_nom: String,
  signataire_email: String,
  signature_image: String, // stocke l’image base64
  signature_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Signature", SignatureSchema);
