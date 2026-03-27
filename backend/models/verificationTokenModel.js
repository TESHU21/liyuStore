import mongoose from "mongoose";
import crypto from "crypto";
const { ObjectId } = mongoose.Schema;

const verificationTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    tokenHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5,
    },
    purpose: {
      type: String,
      enum: ["PASSWORD_RESET", "EMAIL_VERIFY", "PHONE_VERIFY", "ACCOUNT_SETUP"],
      required: true,
      index: true,
    },
    used: {
      type: Boolean,
      default: false,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetTokenHash: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Method to verify OTP/token
verificationTokenSchema.methods.verifyToken = function (token) {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return this.tokenHash === hash && !this.used && this.expiresAt > new Date();
};

// Method to verify reset token
verificationTokenSchema.methods.verifyResetToken = function (resetToken) {
  if (!this.resetTokenHash || !this.resetTokenExpires) {
    return false;
  }
  const hash = crypto.createHash("sha256").update(resetToken).digest("hex");
  return this.resetTokenHash === hash && this.resetTokenExpires > new Date();
};

// Method to increment attempts
verificationTokenSchema.methods.incrementAttempts = function () {
  this.attempts += 1;
  return this.save();
};

// Method to mark as used
verificationTokenSchema.methods.markAsUsed = function () {
  this.used = true;
  this.isVerified = true;
  return this.save();
};

// Method to generate reset token
verificationTokenSchema.methods.generateResetToken = function (
  expiresInMinutes = 15,
) {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetTokenExpires = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  return resetToken;
};

// Static method to create verification token
verificationTokenSchema.statics.createToken = async function (
  userId,
  email,
  token,
  purpose,
  expiresInMinutes = 5,
) {
  // Hash the token
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  // Create and save the token
  const verificationToken = await this.create({
    userId,
    email,
    tokenHash,
    purpose,
    expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
  });

  return verificationToken;
};

// Static method to find valid token
verificationTokenSchema.statics.findValidToken = async function (
  email,
  purpose,
) {
  return this.findOne({
    email,
    purpose,
    used: false,
    expiresAt: { $gt: new Date() },
    attempts: { $lt: 5 },
  }).sort({ createdAt: -1 });
};

// Static method to cleanup expired tokens
verificationTokenSchema.statics.cleanupExpired = async function () {
  const result = await this.deleteMany({
    expiresAt: { $lt: new Date() },
  });
  return result.deletedCount;
};

// Static method to cleanup used tokens
verificationTokenSchema.statics.cleanupUsed = async function (
  olderThanDays = 7,
) {
  const cutoffDate = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
  const result = await this.deleteMany({
    used: true,
    updatedAt: { $lt: cutoffDate },
  });
  return result.deletedCount;
};

// TTL Index - Auto-delete expired tokens
verificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Compound indexes for better query performance
verificationTokenSchema.index({ email: 1, purpose: 1, used: 1 });
verificationTokenSchema.index({ userId: 1, purpose: 1 });

// Pre-save middleware to validate expiration
verificationTokenSchema.pre("save", function (next) {
  if (this.expiresAt <= new Date()) {
    const error = new Error("Token expiration date must be in the future");
    return next(error);
  }
  next();
});

// Virtual for checking if token is expired
verificationTokenSchema.virtual("isExpired").get(function () {
  return this.expiresAt < new Date();
});

// Virtual for checking if max attempts reached
verificationTokenSchema.virtual("maxAttemptsReached").get(function () {
  return this.attempts >= 5;
});

// Virtual for time remaining
verificationTokenSchema.virtual("timeRemaining").get(function () {
  const now = new Date();
  const expiresAt = new Date(this.expiresAt);
  const diff = expiresAt - now;
  return diff > 0 ? Math.floor(diff / 1000) : 0; // seconds remaining
});

// Ensure virtuals are included in JSON output
verificationTokenSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.tokenHash;
    delete ret.resetTokenHash;
    delete ret.__v;
    return ret;
  },
});

const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema,
);

export default VerificationToken;
