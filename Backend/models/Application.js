const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },

  jobRole: {
    type: String,
    required: true,
  },

  location: {
    type: String,
  },

  appliedDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    default: "Applied",
  },

  jobLink: {
    type: String,
  },

  notes: {
    type: String,
  },
});

module.exports = mongoose.model("Application", applicationSchema);