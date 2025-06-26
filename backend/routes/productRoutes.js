import express from "express";
// import formidable from "express-formidable"; // No longer needed for JSON routes, keep if for file uploads elsewhere
const router = express.Router();

// controllers
import {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts,
} from "../controllers/productController.js";

// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// Base route for /api/products
router
    .route("/")
    .get(fetchProducts) // Public access to fetch all products (paginated)
    // For adding a product, authenticate user, ensure they are admin.
    // express.json() in index.js will handle parsing the JSON body.
    .post(authenticate, authorizeAdmin, addProduct); // Removed formidable() here

// Route for fetching all products (non-paginated, often for admin list or specific views)
router.route("/allproducts").get(fetchAllProducts);

// Route for adding a review to a specific product
// User must be authenticated, and product ID format is checked
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

// Routes for fetching top-rated and newest products
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

// Routes for specific product by ID: GET, PUT, DELETE
router
    .route("/:id")
    .get(fetchProductById) // Public access to fetch single product by ID
    // For updating a product, authenticate user, ensure they are admin.
    // express.json() in index.js will handle parsing the JSON body.
    .put(authenticate, authorizeAdmin, updateProductDetails) // Removed formidable() here
    // For deleting a product, authenticate user, ensure they are admin.
    .delete(authenticate, authorizeAdmin, removeProduct);

// Route for filtering products by categories and price range (POST to send filter criteria)
router.route("/filtered-products").post(filterProducts);

export default router;
