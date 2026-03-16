import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import VerificationToken from "../models/verificationTokenModel.js";
import { sendOtpEmail } from "../config/mailersend.js";
import {
  generateOTP,
  getOTPExpiration,
  canSendOTP,
  isOTPExpired,
} from "../utils/otpGenerator.js";
import bcrypt from "bcryptjs";

/**
 * @desc    Send password reset OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email) {
    res.status(400);
    throw new Error("Email address is required");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal if user exists or not for security
    return res.status(200).json({
      message:
        "If an account with this email exists, a password reset OTP has been sent",
    });
  }

  // Check if there's a recent unused OTP
  const existingToken = await VerificationToken.findValidToken(
    email,
    "PASSWORD_RESET",
  );

  if (existingToken) {
    // Check cooldown period
    const lastOtpSent = existingToken.createdAt;
    if (!canSendOTP(lastOtpSent, 2)) {
      // 2 minute cooldown
      res.status(429);
      throw new Error("Please wait 2 minutes before requesting another OTP");
    }

    // Delete existing token to create new one
    await VerificationToken.deleteOne({ _id: existingToken._id });
  }

  try {
    // Generate 6-digit OTP
    const otp = generateOTP();
    const expiration = getOTPExpiration(15); // 15 minutes

    // Create verification token
    await VerificationToken.createToken(
      user._id,
      email,
      otp,
      "PASSWORD_RESET",
      5,
    );

    // Send OTP email
    await sendOtpEmail(email, otp);

    console.log(`Password reset OTP sent to ${email}: ${otp}`);

    res.status(200).json({
      message: "Password reset OTP sent to your email",
      email: email,
      expiresIn: 5 * 60, // seconds
    });
  } catch (error) {
    console.error("Error sending password reset OTP:", error);
    res.status(500);
    throw new Error("Failed to send password reset OTP");
  }
});

/**
 * @desc    Verify password reset OTP
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  // Validate input
  if (!email || !otp) {
    res.status(400);
    throw new Error("Email and OTP are required");
  }

  // Validate OTP format
  if (!/^\d{6}$/.test(otp)) {
    res.status(400);
    throw new Error("OTP must be a 6-digit number");
  }

  // Find valid token
  const tokenDoc = await VerificationToken.findValidToken(
    email,
    "PASSWORD_RESET",
  );

  if (!tokenDoc) {
    res.status(400);
    throw new Error("Invalid or expired OTP. Please request a new one");
  }

  // Check if max attempts reached
  if (tokenDoc.attempts >= 5) {
    res.status(429);
    throw new Error("Maximum attempts reached. Please request a new OTP");
  }

  // Verify OTP
  const isValidOTP = tokenDoc.verifyToken(otp);

  if (!isValidOTP) {
    await tokenDoc.incrementAttempts();
    const remainingAttempts = 5 - tokenDoc.attempts;

    res.status(400);
    throw new Error(`Invalid OTP. ${remainingAttempts} attempts remaining`);
  }

  // Generate reset token
  const resetToken = tokenDoc.generateResetToken(15); // 15 minutes
  await tokenDoc.save();

  console.log(`OTP verified for ${email}, reset token generated`);

  res.status(200).json({
    message: "OTP verified successfully",
    resetToken: resetToken, // Send to client for password reset
    expiresIn: 15 * 60, // seconds
  });
});

/**
 * @desc    Reset password with reset token
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  // Validate input
  if (!email || !resetToken || !newPassword) {
    res.status(400);
    throw new Error("Email, reset token, and new password are required");
  }

  // Validate password strength
  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find verification token with reset token
  const tokenDoc = await VerificationToken.findOne({
    email,
    purpose: "PASSWORD_RESET",
    used: false,
    isVerified: true,
  });

  if (!tokenDoc) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  // Verify reset token
  const isValidResetToken = tokenDoc.verifyResetToken(resetToken);

  if (!isValidResetToken) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  // Check if reset token is expired
  if (isOTPExpired(tokenDoc.resetTokenExpires)) {
    res.status(400);
    throw new Error("Reset token has expired. Please request a new OTP");
  }

  try {
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Mark token as used
    await tokenDoc.markAsUsed();

    console.log(`Password reset successful for ${email}`);

    res.status(200).json({
      message:
        "Password reset successful. You can now login with your new password",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500);
    throw new Error("Failed to reset password");
  }
});

/**
 * @desc    Resend password reset OTP
 * @route   POST /api/auth/resend-otp
 * @access  Public
 */
export const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email) {
    res.status(400);
    throw new Error("Email address is required");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal if user exists or not for security
    return res.status(200).json({
      message:
        "If an account with this email exists, a password reset OTP has been sent",
    });
  }

  // Find existing token
  const existingToken = await VerificationToken.findValidToken(
    email,
    "PASSWORD_RESET",
  );

  if (existingToken) {
    // Check cooldown period
    const lastOtpSent = existingToken.createdAt;
    if (!canSendOTP(lastOtpSent, 2)) {
      // 2 minute cooldown
      res.status(429);
      throw new Error("Please wait 2 minutes before requesting another OTP");
    }

    // Delete existing token to create new one
    await VerificationToken.deleteOne({ _id: existingToken._id });
  }

  try {
    // Generate new OTP
    const otp = generateOTP();

    // Create new verification token
    await VerificationToken.createToken(
      user._id,
      email,
      otp,
      "PASSWORD_RESET",
      5,
    );

    // Send OTP email
    await sendOtpEmail(email, otp);

    console.log(`Password reset OTP resent to ${email}: ${otp}`);

    res.status(200).json({
      message: "Password reset OTP resent to your email",
      email: email,
      expiresIn: 5 * 60, // seconds
    });
  } catch (error) {
    console.error("Error resending password reset OTP:", error);
    res.status(500);
    throw new Error("Failed to resend password reset OTP");
  }
});

/**
 * @desc    Check OTP status
 * @route   GET /api/auth/otp-status/:email
 * @access  Public
 */
export const getOtpStatus = asyncHandler(async (req, res) => {
  const { email } = req.params;

  // Find active token
  const tokenDoc = await VerificationToken.findValidToken(
    email,
    "PASSWORD_RESET",
  );

  if (!tokenDoc) {
    return res.status(200).json({
      hasActiveOtp: false,
      message: "No active OTP found",
    });
  }

  const timeRemaining = Math.floor((tokenDoc.expiresAt - new Date()) / 1000);
  const canResend = canSendOTP(tokenDoc.createdAt, 2);

  res.status(200).json({
    hasActiveOtp: true,
    expiresAt: tokenDoc.expiresAt,
    timeRemaining: timeRemaining,
    attempts: tokenDoc.attempts,
    maxAttempts: 5,
    canResend: canResend,
    cooldownMinutes: 2,
  });
});

export default {
  forgotPassword,
  verifyOtp,
  resetPassword,
  resendOtp,
  getOtpStatus,
};
