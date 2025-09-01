const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// GET /api/projects - Get all projects
router.get("/", projectController.getAllProjects);

// GET /api/projects/:id - Get specific project
router.get("/:id", projectController.getProjectById);

module.exports = router;
