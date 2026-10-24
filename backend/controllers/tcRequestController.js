const mongoose = require("mongoose");
const TCRequest = require("../models/TCRequest");
const Student = require("../models/Student");

// Student submits a duplicate TC request
const createTCRequest = async (req, res) => {
  try {
    const enrollmentNo = String(
      req.params.enrollmentNo || ""
    ).trim();

    if (!enrollmentNo) {
      return res.status(400).json({
        success: false,
        message: "Enrollment number is required.",
      });
    }

    const student = await Student.findOne({ enrollmentNo });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Student schema must contain tcGenerated.
    if (student.tcGenerated !== true) {
      return res.status(400).json({
        success: false,
        message:
          "A first TC must be generated before requesting a duplicate.",
      });
    }

    const existingRequest = await TCRequest.findOne({
      enrollmentNo,
      status: { $in: ["Pending", "Approved"] },
    });

    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message: `A ${existingRequest.status} request already exists.`,
        data: existingRequest,
      });
    }

    const reason =
      String(req.body?.reason || "").trim() ||
      "Request for a duplicate Transfer Certificate";

    const request = await TCRequest.create({
      enrollmentNo,
      reason,
    });

    return res.status(201).json({
      success: true,
      message: "TC request submitted successfully.",
      data: request,
    });
  } catch (error) {
    console.error("createTCRequest:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit TC request.",
    });
  }
};

// Admin lists requests
const getTCRequests = async (req, res) => {
  try {
    const allowedStatuses = [
      "Pending",
      "Approved",
      "Rejected",
      "Used",
    ];

    const status = String(req.query.status || "All");
    const filter = {};

    if (status !== "All") {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid request status.",
        });
      }

      filter.status = status;
    }

    const requests = await TCRequest.find(filter)
      .sort({ requestedAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("getTCRequests:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch TC requests.",
    });
  }
};

// Admin approves or rejects a pending request
const reviewTCRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const decision = req.body?.decision;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request ID.",
      });
    }

    if (!["Approved", "Rejected"].includes(decision)) {
      return res.status(400).json({
        success: false,
        message: "Decision must be Approved or Rejected.",
      });
    }

    const request = await TCRequest.findOneAndUpdate(
      { _id: id, status: "Pending" },
      {
        $set: {
          status: decision,
          reviewedAt: new Date(),
          reviewedBy: "Admin",
        },
      },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Pending request not found or already reviewed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Request ${decision.toLowerCase()} successfully.`,
      data: request,
    });
  } catch (error) {
    console.error("reviewTCRequest:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to review TC request.",
    });
  }
};

module.exports = {
  createTCRequest,
  getTCRequests,
  reviewTCRequest,
};