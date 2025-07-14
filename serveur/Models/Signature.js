const mongoose = require("mongoose");

const SignatureSchema = new mongoose.Schema(
  {
    contractInstance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContractInstance",
      required: true,
    },
    signataire_nom: String,
    signataire_email: String,
    status: {
      type: String,
      enum: ["en_attente", "signé", "refusé"],
      default: "en_attente",
    },
    signature_date: Date,
    signature_url: String, // lien du document signé
  },
  { timestamps: true }
);

module.exports = mongoose.model("Signature", SignatureSchema);
