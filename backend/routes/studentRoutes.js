const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudentByEnrollment,
  generateTC,
  requestDuplicateTC,
} = require("../controllers/studentController");

router.post("/", addStudent);

router.get("/:enrollmentNo", getStudentByEnrollment);

router.post("/:enrollmentNo/generate-tc", generateTC);

router.post("/:enrollmentNo/tc-requests", requestDuplicateTC);

module.exports = router;