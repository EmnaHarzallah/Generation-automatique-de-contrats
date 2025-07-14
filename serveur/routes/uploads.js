const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const fs = require("fs");

router.get("/templates", (req, res) => {
  fs.readdir("./uploads/", (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la lecture du dossier." });
    }
    const docxFiles = files.filter((file) => file.endsWith(".docx"));
    res.status(200).json({ templates: docxFiles });
  });
});

module.exports = router;
