import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper to create token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Create new user and return token + user data
const createUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

  const token = createToken(savedUser._id);

  res.status(201).json({
    user: {
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
    },
    token,
  });
});

// Login user, return token + user data
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = createToken(existingUser._id);

  res.status(200).json({
    user: {
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    },
    token,
  });
});

// Logout user by clearing cookie (if you want to keep cookie auth)
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// Get all users (admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get profile of current logged in user
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
  });
});

// Update current user profile
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.fullName = req.body.fullName || user.fullName;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

// Delete user by id (only if not admin)
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error("Cannot delete admin user");
  }

  await User.deleteOne({ _id: user._id });
  res.json({ message: "User removed" });
});

// Get user by id (excluding password)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

// Update user by id (admin use)
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.fullName = req.body.fullName || user.fullName;
  user.email = req.body.email || user.email;
  user.isAdmin = Boolean(req.body.isAdmin);

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
