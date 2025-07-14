const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
  {
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContractTemplate",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    données_champs: { type: mongoose.Schema.Types.Mixed, required: true }, // JSON dynamique
    url_pdf: String,
    etat: {
      type: String,
      enum: ["brouillon", "payé", "signé"],
      default: "brouillon",
    },
    signature_url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contract", ContractSchema);
