const express = require("express");

const router = express.Router();

const {
  addApplication,
  getApplications,
  deleteApplication,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// Test Route
router.get("/", getApplications);

// Add Application
router.post("/", addApplication);

// Delete Application
router.delete("/:id", deleteApplication);

//update Application
router.put("/:id", updateApplicationStatus);

module.exports = router;