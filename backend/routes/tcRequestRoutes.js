const express = require("express");
const router = express.Router();

const {
  createTCRequest,
  getTCRequests,
  reviewTCRequest,
} = require("../controllers/tcRequestController");

// Student route: no admin key required
router.post(
  "/students/:enrollmentNo/tc-requests",
  createTCRequest
);

// Admin authorization middleware
const requireAdminKey = (req, res, next) => {
  const configuredKey = process.env.ADMIN_APPROVAL_KEY;
  const providedKey = req.get("x-admin-key");

  if (
    !configuredKey ||
    !providedKey ||
    providedKey !== configuredKey
  ) {
    return res.status(401).json({
      success: false,
      message: "Admin key is invalid or not configured.",
    });
  }

  next();
};

// Admin routes
router.get(
  "/tc-requests",
  requireAdminKey,
  getTCRequests
);

router.patch(
  "/tc-requests/:id/review",
  requireAdminKey,
  reviewTCRequest
);

module.exports = router;