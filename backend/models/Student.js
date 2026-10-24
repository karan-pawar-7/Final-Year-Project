const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    tcNo: {
      type: String,
      default: "4355",
      trim: true,
    },
    recordNo: {
      type: String,
      required: true,
      trim: true,
    },
    pageNo: {
      type: String,
      required: true,
      trim: true,
    },
    enrollmentNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      default: "",
      trim: true,
    },
    rollNumber: {
      type: String,
      default: "",
      trim: true,
    },

    instituteName: {
      type: String,
      default: "Government Polytechnic, Ambad",
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
    },
    raceAndCaste: { type: String, default: "" },
    subCaste: { type: String, default: "" },
    category: { type: String, default: "" },
    motherTongue: { type: String, default: "" },
    religion: { type: String, default: "" },
    nationality: { type: String, default: "Indian" },
    otherNationality: { type: String, default: "" },

    placeOfBirth: { type: String, default: "" },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    dobInWords: { type: String, default: "" },

    lastInstituteAttended: { type: String, default: "" },
    dateOfAdmission: { type: Date, default: null },
    progress: { type: String, default: "" },
    progressOther: { type: String, default: "" },
    conduct: { type: String, default: "" },
    conductOther: { type: String, default: "" },

    course: {
      type: String,
      default: "Diploma in Information Technology",
    },
    branch: {
      type: String,
      default: "Information Technology",
    },
    academicYear: { type: String, default: "" },
    admissionFrom: { type: Date, default: null },
    dateOfLeaving: { type: Date, default: null },

    address: { type: String, default: "" },
    mobileNo: { type: String, default: "" },
    email: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Studying", "Completed", "Left"],
      default: "Studying",
    },

    // Transfer Certificate tracking
    tcGenerated: {
      type: Boolean,
      default: false,
    },
    tcGeneratedAt: {
      type: Date,
      default: null,
    },
    tcGenerationCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);