const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    contractInstance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContractInstance",
      required: true,
    },
    stripe_payment_intent_id: { type: String },
    montant: Number,
    etat: {
      type: String,
      enum: ["en_attente", "réussi", "échoué"],
      default: "en_attente",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
