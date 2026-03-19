/**
 * OTP (One-Time Password) Generator Utility
 * Generates secure 6-digit OTPs for various verification purposes
 */

import crypto from "crypto";

/**
 * Generate a 6-digit numeric OTP
 * @returns {string} 6-digit OTP string
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Generate alphanumeric OTP (optional)
 * @param {number} length - Length of OTP (default 6)
 * @returns {string} Alphanumeric OTP
 */
export const generateAlphanumericOTP = (length = 6) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Validate OTP format
 * @param {string} otp - OTP to validate
 * @returns {boolean} True if valid 6-digit OTP
 */
export const validateOTPFormat = (otp) => {
  return /^\d{6}$/.test(otp);
};

/**
 * Calculate OTP expiration time
 * @param {number} minutes - Minutes from now
 * @returns {Date} Expiration date
 */
export const getOTPExpiration = (minutes = 5) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

/**
 * Check if OTP is expired
 * @param {Date} expiresAt - Expiration date
 * @returns {boolean} True if expired
 */
export const isOTPExpired = (expiresAt) => {
  return new Date() > new Date(expiresAt);
};

/**
 * Generate secure random bytes for tokens
 * @param {number} bytes - Number of bytes (default 32)
 * @returns {string} Hex string
 */
export const generateSecureToken = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

/**
 * Rate limiting check for OTP requests
 * @param {number} lastOtpSent - Timestamp of last OTP
 * @param {number} cooldownMinutes - Cooldown period in minutes
 * @returns {boolean} True if cooldown period has passed
 */
export const canSendOTP = (lastOtpSent, cooldownMinutes = 2) => {
  if (!lastOtpSent) return true;
  const cooldownMs = cooldownMinutes * 60 * 1000;
  return Date.now() - new Date(lastOtpSent).getTime() > cooldownMs;
};

/**
 * Format remaining time for user display
 * @param {Date} expiresAt - Expiration date
 * @returns {string} Formatted time remaining
 */
export const formatTimeRemaining = (expiresAt) => {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diff = expires - now;

  if (diff <= 0) return "Expired";

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return `${seconds} second${seconds > 1 ? "s" : ""}`;
};

export default {
  generateOTP,
  generateAlphanumericOTP,
  validateOTPFormat,
  getOTPExpiration,
  isOTPExpired,
  generateSecureToken,
  canSendOTP,
  formatTimeRemaining,
};
