const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_TA_CLE_SECRETE");

router.post("/create-checkout-session", async (req, res) => {
  const { option } = req.body;
  const price = option === "WeeFizz API" ? 19900 : 24900;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: `Contrat ${option}` },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
