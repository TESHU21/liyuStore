import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
    console.log("🔐 authenticate middleware hit");


  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // FIXED: Use decoded.id because that's how you signed it
    const user = await User.findById(decoded.id).select("-password");
    console.log("User from DB:", user);

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed." });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as an admin." });
};

export { authenticate, authorizeAdmin };
