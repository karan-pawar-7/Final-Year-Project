const Student = require("../models/Student");
const TCRequest = require("../models/TCRequest");

// Add a new student
const addStudent = async (req, res) => {
  try {
    const studentData = req.body;

    if (!studentData.enrollmentNo?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Enrollment number is required.",
      });
    }

    const existingStudent = await Student.findOne({
      enrollmentNo: studentData.enrollmentNo.trim(),
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "This enrollment number already exists.",
      });
    }

    const student = await Student.create({
      ...studentData,
      enrollmentNo: studentData.enrollmentNo.trim(),
      tcGenerated: false,
      tcGeneratedAt: null,
      tcGenerationCount: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Student information saved successfully.",
      data: student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate enrollment number.",
      });
    }

    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Add student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save student information.",
    });
  }
};

// Find student by enrollment number
const getStudentByEnrollment = async (req, res) => {
  try {
    const enrollmentNo = req.params.enrollmentNo.trim();

    const student = await Student.findOne({ enrollmentNo });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Fetch student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch student information.",
    });
  }
};

// Generate the first TC, or use one approved duplicate request
const generateTC = async (req, res) => {
  try {
    const enrollmentNo = req.params.enrollmentNo.trim();

    // Atomic operation: only one simultaneous request can generate
    // the first TC for this student.
    const firstTC = await Student.findOneAndUpdate(
      {
        enrollmentNo,
        tcGenerated: { $ne: true },
      },
      {
        $set: {
          tcGenerated: true,
          tcGeneratedAt: new Date(),
        },
        $inc: {
          tcGenerationCount: 1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (firstTC) {
      return res.status(200).json({
        success: true,
        message: "TC generated successfully.",
        data: firstTC,
      });
    }

    const student = await Student.findOne({ enrollmentNo });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // TC already exists. Require a previously approved request.
    // Claim the approval once so it cannot be used twice.
    const approvedRequest = await TCRequest.findOneAndUpdate(
      {
        enrollmentNo,
        status: "Approved",
      },
      {
        $set: {
          status: "Used",
        },
      },
      {
        new: true,
        sort: { reviewedAt: 1 },
      }
    );

    if (!approvedRequest) {
      return res.status(409).json({
        success: false,
        code: "TC_ALREADY_GENERATED",
        message:
          "TC has already been generated. Admin approval is required for another TC.",
      });
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { enrollmentNo, tcGenerated: true },
      {
        $set: { tcGeneratedAt: new Date() },
        $inc: { tcGenerationCount: 1 },
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      // Avoid silently losing the approval if the student update fails.
      await TCRequest.findByIdAndUpdate(approvedRequest._id, {
        $set: { status: "Approved" },
      });

      return res.status(500).json({
        success: false,
        message: "Could not update the TC record.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Approved additional TC generated successfully.",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Generate TC error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate TC.",
    });
  }
};

// Request approval for another TC
const requestDuplicateTC = async (req, res) => {
  try {
    const enrollmentNo = req.params.enrollmentNo.trim();

    const student = await Student.findOne({ enrollmentNo });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    if (student.tcGenerated !== true) {
      return res.status(400).json({
        success: false,
        message: "Generate the first TC before requesting another.",
      });
    }

    const existingRequest = await TCRequest.findOne({
      enrollmentNo,
      status: { $in: ["Pending", "Approved"] },
    });

    if (existingRequest) {
      return res.status(409).json({
        success: false,
        message:
          existingRequest.status === "Pending"
            ? "An approval request is already pending."
            : "An approved request is already available to use.",
        data: existingRequest,
      });
    }

    const request = await TCRequest.create({
      enrollmentNo,
      reason:
        typeof req.body.reason === "string" && req.body.reason.trim()
          ? req.body.reason.trim()
          : "Request for a duplicate Transfer Certificate",
    });

    return res.status(201).json({
      success: true,
      message: "Approval request submitted successfully.",
      data: request,
    });
  } catch (error) {
    console.error("Duplicate TC request error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit approval request.",
    });
  }
};

module.exports = {
  addStudent,
  getStudentByEnrollment,
  generateTC,
  requestDuplicateTC,
};