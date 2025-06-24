import express from "express";
const router = express.Router();

import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// ✅ Create category
router.post("/", authenticate, authorizeAdmin, createCategory);

// ✅ List categories
router.get("/", listCategory);

// ✅ Read category
router.get("/:categoryId", checkId("categoryId"), readCategory);

// ✅ Update category
router.put("/:categoryId", authenticate, authorizeAdmin, checkId("categoryId"), updateCategory);

// ✅ Delete category
router.delete("/:categoryId", authenticate, authorizeAdmin, checkId("categoryId"), removeCategory);

export default router;
