const express = require("express");
const router = express.Router();
const { createSignature } = require("../controllers/SignatureController");

// Route sans middleware d'authentification
router.post("/", createSignature);

module.exports = router;
