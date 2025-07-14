require("dotenv").config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY manquante dans .env");
}

module.exports = require("stripe")(process.env.STRIPE_SECRET_KEY);
