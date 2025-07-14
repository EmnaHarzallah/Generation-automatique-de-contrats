const mongoose = require("mongoose");

const ContratFieldSchema = new mongoose.Schema(
  {
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContratTemplate",
      required: true,
    },
    nom_du_champ: { type: String, required: true }, // ex: "nom_societe"
    type: {
      type: String,
      enum: ["nom_client", "duree", "option", "signature"],
    },
    obligatoire: { type: Boolean, default: true },
    ordre_affichage: Number,
    placeholder: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContratField", ContratFieldSchema);
