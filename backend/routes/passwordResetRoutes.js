import express from "express";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
  resendOtp,
  getOtpStatus,
} from "../controllers/passwordResetController.js";
const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);
router.get("/status/:email", getOtpStatus);

export default router;
