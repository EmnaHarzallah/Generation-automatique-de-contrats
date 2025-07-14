const mongoose = require("mongoose");

const ContratTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    filePath: { type: String, required: true }, // Chemin vers le .docx
    price: { type: Number, required: true },
    fields: [
      {
        name: { type: String, required: true }, //  {{balises}}
        label: { type: String, required: true }, // Libellé à afficher dans le formulaire
        type: {
          type: String,
          enum: ["text", "date", "number"],
          default: "text",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContratTemplate", ContratTemplateSchema);
