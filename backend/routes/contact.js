const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// POST /api/contact - Handle contact form submissions
router.post("/", contactController.handleContactForm);

module.exports = router;
