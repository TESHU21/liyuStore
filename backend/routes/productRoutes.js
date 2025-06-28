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
    fetchProductReviews,
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
    
    .post(authenticate, authorizeAdmin, addProduct); // Removed formidable() here

// Route for fetching all products (non-paginated, often for admin list or specific views)
router.route("/allproducts").get(fetchAllProducts);

// Reviews route: GET to fetch, POST to add
router
  .route("/:id/reviews")
  .get(fetchProductReviews) // <-- New GET endpoint for reviews
.post(authenticate, checkId(), addProductReview);

// Routes for fetching top-rated and newest products
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

// Routes for specific product by ID: GET, PUT, DELETE
router
    .route("/:id")
    .get(fetchProductById) // Public access to fetch single product by ID
   
    .put(authenticate, authorizeAdmin, updateProductDetails) // Removed formidable() here
    .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
