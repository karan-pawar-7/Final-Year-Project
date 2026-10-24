const mongoose = require("mongoose");

const tcRequestSchema = new mongoose.Schema(
  {
    enrollmentNo: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    reason: {
      type: String,
      trim: true,
      default: "Request for a duplicate Transfer Certificate",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Used"],
      default: "Pending",
      index: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    reviewedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.TCRequest ||
  mongoose.model("TCRequest", tcRequestSchema);