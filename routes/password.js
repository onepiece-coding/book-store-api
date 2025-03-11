const express = require("express");
const router = express.Router();
const {
  getForgotPasswordView,
  SendForgotPasswordLink,
  GetResetPasswordView,
  resetPassword,
} = require("../controllers/passwordController");

// /password/forgot-password
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(SendForgotPasswordLink);

// /password/reset-password/:userId/:token
router
  .route("/reset-password/:userId/:token")
  .get(GetResetPasswordView)
  .post(resetPassword);

module.exports = router;
