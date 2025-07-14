const mongoose = require("mongoose");

const ContractFieldSchema = new mongoose.Schema(
  {
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContractTemplate",
      required: true,
    },
    nom_du_champ: { type: String, required: true }, // ex: "nom_societe"
    type: {
      type: String,
      enum: ["text", "date", "email", "number"],
      default: "text",
    },
    obligatoire: { type: Boolean, default: true },
    ordre_affichage: Number,
    placeholder: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContractField", ContractFieldSchema);
