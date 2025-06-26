import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * @desc Add new product
 * @route POST /api/products
 * @access Private/Admin (assuming an auth middleware sets req.user)
 */
const addProduct = asyncHandler(async (req, res) => {
    // --- START DEBUGGING addProduct ---
    console.log("--- addProduct Controller Hit ---");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.originalUrl);
    console.log("Request Headers (partial for debugging):", {
        'Content-Type': req.headers['content-type'],
        'Authorization': req.headers['authorization'] ? 'Bearer (token present)' : 'No token',
        'User-Agent': req.headers['user-agent'],
        'Referer': req.headers['referer']
    });
    console.log("Request User (from auth middleware, if any):", req.user ? `ID: ${req.user._id}, Username: ${req.user.username}` : 'No user object');
    console.log("Request Body received:", JSON.stringify(req.body, null, 2)); // Stringify for better logging of nested objects
    // --- END DEBUGGING addProduct ---

    // Destructure the required fields from req.body
    const { name, description, price, category, quantity, brand, countInStock, image } = req.body;

    // ✅ Backend Validation
    if (!name) {
        console.error("Validation Error: Name is required.");
        return res.status(400).json({ error: "Name is required" });
    }
    if (!brand) {
        console.error("Validation Error: Brand is required.");
        return res.status(400).json({ error: "Brand is required" });
    }
    if (!description) {
        console.error("Validation Error: Description is required.");
        return res.status(400).json({ error: "Description is required" });
    }
    if (!price || isNaN(price) || price < 0) { // Added number check for price
        console.error("Validation Error: Valid price is required.");
        return res.status(400).json({ error: "Valid price is required" });
    }
    if (!category) {
        console.error("Validation Error: Category is required.");
        return res.status(400).json({ error: "Category is required" });
    }
    if (!quantity || isNaN(quantity) || quantity < 0) { // Added number check for quantity
        console.error("Validation Error: Valid quantity is required.");
        return res.status(400).json({ error: "Valid quantity is required" });
    }
    if (!countInStock || isNaN(countInStock) || countInStock < 0) { // Added number check for countInStock
        console.error("Validation Error: Valid count in stock is required.");
        return res.status(400).json({ error: "Valid count in stock is required" });
    }
    if (!image) {
        console.error("Validation Error: Image URL is required.");
        return res.status(400).json({ error: "Image URL is required" });
    }

    try {
        // Create a new Product instance with the validated data
        const product = new Product({
            name,
            description,
            price,
            category,
            quantity,
            brand,
            countInStock,
            image,
            // Assuming default values for rating and numReviews from schema
            // reviews array will be empty initially
        });

        console.time("saveProduct"); // Start timer for database save operation
        const savedProduct = await product.save(); // Save the new product to the database
        console.timeEnd("saveProduct"); // End timer

        console.log("Product successfully saved to DB. ID:", savedProduct._id);
        res.status(201).json(savedProduct); // Send back the created product with a 201 status
        console.log("Response sent: 201 Created for product ID:", savedProduct._id);

    } catch (dbError) {
        // Catch any errors that occur during the database save operation
        console.error("Database Error during addProduct:", dbError);

        let errorMessage = "An unexpected error occurred while creating the product.";
        let statusCode = 500;

        if (dbError.code === 11000) { // MongoDB duplicate key error (e.g., if product name is unique)
            errorMessage = "A product with this name (or unique field) already exists.";
            statusCode = 409; // Conflict
        } else if (dbError.name === 'ValidationError') { // Mongoose validation error (e.g., invalid ObjectId format for category)
            errorMessage = `Mongoose Validation Error: ${dbError.message}`;
            statusCode = 400; // Bad Request
        } else if (dbError.name === 'CastError') { // Mongoose casting error (e.g., invalid ID format for category)
            errorMessage = `Mongoose Cast Error: ${dbError.message}. Check ID formats.`;
            statusCode = 400; // Bad Request
        }

        res.status(statusCode).json({
            error: errorMessage,
            details: dbError.message, // Provide specific Mongoose error message
            stack: process.env.NODE_ENV === 'development' ? dbError.stack : undefined // Include stack in dev
        });
        console.error(`Response sent: ${statusCode} for addProduct due to DB error.`);
    }
});

/**
 * @desc Update product details
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
const updateProductDetails = asyncHandler(async (req, res) => {
    console.log(`--- updateProductDetails Controller Hit for ID: ${req.params.id} ---`);
    console.log("Request Body for update:", JSON.stringify(req.body, null, 2));

    const updates = req.body;

    // Basic check to ensure there's something to update
    if (Object.keys(updates).length === 0) {
        console.warn("Update Product Warning: No fields provided for update.");
        return res.status(400).json({ error: "No fields provided for update" });
    }

    try {
        // findByIdAndUpdate will find the product by ID and apply the updates
        // { new: true } returns the updated document
        // { runValidators: true } ensures schema validators run on updates
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: updates }, // Use $set to only update the provided fields, prevents overwriting entire document
            { new: true, runValidators: true }
        );

        if (!product) {
            console.warn(`Product not found for update with ID: ${req.params.id}`);
            return res.status(404).json({ error: "Product not found" });
        }

        console.log("Product updated successfully. ID:", product._id);
        res.json(product); // Send back the updated product
        console.log("Response sent: 200 OK for updateProductDetails.");

    } catch (error) {
        console.error("Update Product Error:", error);
        let errorMessage = "Failed to update product.";
        let statusCode = 500;

        if (error.name === 'CastError') {
            errorMessage = "Invalid product ID format.";
            statusCode = 400;
        } else if (error.name === 'ValidationError') {
            errorMessage = `Validation Error: ${error.message}`;
            statusCode = 400;
        } else if (error.code === 11000) { // Duplicate key error during update
            errorMessage = "A product with this unique field already exists.";
            statusCode = 409;
        }

        res.status(statusCode).json({ error: errorMessage, details: error.message });
        console.error(`Response sent: ${statusCode} for updateProductDetails due to error.`);
    }
});

/**
 * @desc Remove product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
const removeProduct = asyncHandler(async (req, res) => {
    console.log(`--- removeProduct Controller Hit for ID: ${req.params.id} ---`);
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            console.warn(`Product not found for deletion with ID: ${req.params.id}`);
            return res.status(404).json({ error: "Product not found" });
        }

        console.log("Product deleted successfully. ID:", product._id);
        res.json({ message: "Product deleted", product }); // Confirm deletion
        console.log("Response sent: 200 OK for removeProduct.");

    } catch (error) {
        console.error("Remove Product Error:", error);
        let errorMessage = "Failed to delete product.";
        let statusCode = 500;

        if (error.name === 'CastError') {
            errorMessage = "Invalid product ID format for deletion.";
            statusCode = 400;
        }

        res.status(statusCode).json({ error: errorMessage, details: error.message });
        console.error(`Response sent: ${statusCode} for removeProduct due to error.`);
    }
});

/**
 * @desc Fetch paginated products (for shop page)
 * @route GET /api/products?pageNumber=:pageNumber&keyword=:keyword
 * @access Public
 */
const fetchProducts = asyncHandler(async (req, res) => {
    console.log("--- fetchProducts Controller Hit ---");
    const pageSize = 6; // Number of products per page
    const page = Number(req.query.pageNumber) || 1; // Current page number, default to 1

    // Build keyword query for search functionality
    const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword, $options: "i" } } // Case-insensitive regex search
        : {};

    try {
        const count = await Product.countDocuments({ ...keyword }); // Total count of matching products
        const products = await Product.find({ ...keyword })
            .limit(pageSize) // Limit results to pageSize
            .skip(pageSize * (page - 1)); // Skip products for previous pages

        console.log(`Fetched ${products.length} products for page ${page} with keyword: '${req.query.keyword || ""}'. Total matching: ${count}`);
        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize), // Total number of pages
            total: count, // Total count of matching products
        });
        console.log("Response sent: 200 OK for fetchProducts.");

    } catch (error) {
        console.error("Fetch Products Error:", error);
        res.status(500).json({ error: "Failed to fetch products", details: error.message });
        console.error("Response sent: 500 for fetchProducts due to error.");
    }
});

/**
 * @desc Fetch product by ID
 * @route GET /api/products/:id
 * @access Public
 */
const fetchProductById = asyncHandler(async (req, res) => {
    console.log(`--- fetchProductById Controller Hit for ID: ${req.params.id} ---`);
    try {
        // Find product by ID and populate its category details
        const product = await Product.findById(req.params.id).populate("category");

        if (!product) {
            console.warn(`Product not found for ID: ${req.params.id}`);
            return res.status(404).json({ error: "Product not found" });
        }

        console.log("Product fetched by ID successfully. ID:", product._id);
        res.json(product);
        console.log("Response sent: 200 OK for fetchProductById.");

    } catch (error) {
        console.error("Fetch Product By ID Error:", error);
        let errorMessage = "Failed to fetch product by ID.";
        let statusCode = 500;

        if (error.name === 'CastError') {
            errorMessage = "Invalid product ID format.";
            statusCode = 400;
        }

        res.status(statusCode).json({ error: errorMessage, details: error.message });
        console.error(`Response sent: ${statusCode} for fetchProductById due to error.`);
    }
});

/**
 * @desc Fetch all products (e.g., for home page display, admin list)
 * @route GET /api/products/all
 * @access Public (can be restricted if needed)
 */
const fetchAllProducts = asyncHandler(async (req, res) => {
    console.log("--- fetchAllProducts Controller Hit ---");
    try {
        const products = await Product.find({})
            .populate("category") // Get category details
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(12); // Limit to a reasonable number for display

        console.log(`Fetched ${products.length} all products.`);
        res.json(products);
        console.log("Response sent: 200 OK for fetchAllProducts.");

    } catch (error) {
        console.error("Fetch All Products Error:", error);
        res.status(500).json({ error: "Failed to fetch all products", details: error.message });
        console.error("Response sent: 500 for fetchAllProducts due to error.");
    }
});

/**
 * @desc Add product review
 * @route POST /api/products/:id/reviews
 * @access Private (User must be logged in, assuming req.user from auth middleware)
 */
const addProductReview = asyncHandler(async (req, res) => {
    console.log(`--- addProductReview Controller Hit for product ID: ${req.params.id} ---`);
    // Assuming req.user is populated by an authentication middleware
    console.log("Reviewer User ID:", req.user?._id);
    console.log("Review Data:", JSON.stringify(req.body, null, 2));

    const { rating, comment } = req.body;
    const productId = req.params.id;

    if (!rating || !comment) {
        console.error("Validation Error: Rating and comment are required for review.");
        return res.status(400).json({ error: "Rating and comment are required." });
    }
    if (isNaN(rating) || rating < 1 || rating > 5) { // Basic rating validation
        console.error("Validation Error: Rating must be a number between 1 and 5.");
        return res.status(400).json({ error: "Rating must be a number between 1 and 5." });
    }

    try {
        const product = await Product.findById(productId);

        if (!product) {
            console.warn(`Product not found for review with ID: ${productId}`);
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the user has already reviewed this product
        const alreadyReviewed = product.reviews.find(
            (r) => req.user && r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            console.warn(`User ${req.user?._id} has already reviewed product ${productId}.`);
            return res.status(400).json({ error: "Product already reviewed" });
        }

        // Create the new review object
        const review = {
            name: req.user.username, // Use username from authenticated user
            rating: Number(rating),
            comment,
            user: req.user._id, // Use user ID from authenticated user
        };

        product.reviews.push(review); // Add new review to the product's reviews array
        product.numReviews = product.reviews.length; // Update total review count

        // Recalculate average rating
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews;

        await product.save(); // Save the updated product document
        console.log(`Review added and product updated successfully for product ID: ${productId}`);
        res.status(201).json({ message: "Review added successfully!" });
        console.log("Response sent: 201 Created for addProductReview.");

    } catch (error) {
        console.error("Add Product Review Error:", error);
        let errorMessage = "Failed to add product review.";
        let statusCode = 500;

        if (error.name === 'CastError') {
            errorMessage = "Invalid product ID or user ID format.";
            statusCode = 400;
        } else if (error.name === 'ValidationError') {
            errorMessage = `Validation Error: ${error.message}`;
            statusCode = 400;
        }

        res.status(statusCode).json({ error: errorMessage, details: error.message });
        console.error(`Response sent: ${statusCode} for addProductReview due to error.`);
    }
});

/**
 * @desc Fetch top rated products
 * @route GET /api/products/top
 * @access Public
 */
const fetchTopProducts = asyncHandler(async (req, res) => {
    console.log("--- fetchTopProducts Controller Hit ---");
    try {
        const products = await Product.find({})
            .sort({ rating: -1 }) // Sort by rating in descending order
            .limit(4); // Limit to top 4 products

        console.log(`Fetched ${products.length} top products.`);
        res.json(products);
        console.log("Response sent: 200 OK for fetchTopProducts.");

    } catch (error) {
        console.error("Fetch Top Products Error:", error);
        res.status(500).json({ error: "Failed to fetch top products", details: error.message });
        console.error("Response sent: 500 for fetchTopProducts due to error.");
    }
});

/**
 * @desc Fetch newest products
 * @route GET /api/products/new
 * @access Public
 */
const fetchNewProducts = asyncHandler(async (req, res) => {
    console.log("--- fetchNewProducts Controller Hit ---");
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .limit(5); // Limit to 5 newest products

        console.log(`Fetched ${products.length} newest products.`);
        res.json(products);
        console.log("Response sent: 200 OK for fetchNewProducts.");

    } catch (error) {
        console.error("Fetch New Products Error:", error);
        res.status(500).json({ error: "Failed to fetch new products", details: error.message });
        console.error("Response sent: 500 for fetchNewProducts due to error.");
    }
});

/**
 * @desc Filter products by categories and/or price range
 * @route POST /api/products/filter
 * @access Public
 */
const filterProducts = asyncHandler(async (req, res) => {
    console.log("--- filterProducts Controller Hit ---");
    console.log("Filter Criteria received:", JSON.stringify(req.body, null, 2));

    const { checked, radio } = req.body; // 'checked' for categories (array), 'radio' for price range (array [min, max])
    let query = {}; // MongoDB query object

    try {
        // Filter by categories if 'checked' array is provided and not empty
        if (checked && Array.isArray(checked) && checked.length > 0) {
            query.category = { $in: checked }; // Match products whose category is in the 'checked' array
            console.log("Filtering by categories:", checked);
        }

        // Filter by price range if 'radio' array is provided and has two elements (min, max)
        if (radio && Array.isArray(radio) && radio.length === 2) {
            const minPrice = Number(radio[0]);
            const maxPrice = Number(radio[1]);

            if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice >= 0 && maxPrice >= 0 && minPrice <= maxPrice) {
                query.price = { $gte: minPrice, $lte: maxPrice }; // Price within range
                console.log("Filtering by price range:", [minPrice, maxPrice]);
            } else {
                console.warn("Invalid price range provided for filtering:", radio);
                return res.status(400).json({ error: "Invalid price range provided for filtering." });
            }
        } else if (radio && Array.isArray(radio) && radio.length > 0) {
            console.warn("Invalid radio (price range) array length. Expected 2 elements.");
            return res.status(400).json({ error: "Price range filter expects exactly two values (min, max)." });
        }


        const products = await Product.find(query); // Execute the query
        console.log(`Fetched ${products.length} filtered products based on criteria.`);
        res.json(products);
        console.log("Response sent: 200 OK for filterProducts.");

    } catch (error) {
        console.error("Filter Products Error:", error);
        res.status(500).json({ error: "Failed to filter products", details: error.message });
        console.error("Response sent: 500 for filterProducts due to error.");
    }
});

// Export all controller functions for use in routes
export {
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
};
