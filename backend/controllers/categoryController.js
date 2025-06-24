import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

/**
 * @desc Create a new category
 * @route POST /api/categories
 * @access Private/Admin
 */
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    console.log(`Attempting to create category with name: ${name}`); // Log initiation

    if (!name) {
      console.log("Create category failed: Name is required."); // Log validation failure
      return res.status(400).json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      console.log(`Create category failed: Category with name '${name}' already exists.`); // Log conflict
      return res.status(409).json({ error: "Category with this name already exists" });
    }

    const category = await new Category({ name }).save();
    console.log(`Category created successfully: ${category._id} - ${category.name}`); // Log success
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error); // Existing error logging
    res.status(500).json({ error: "Internal server error during category creation" });
  }
});

/**
 * @desc Update an existing category
 * @route PUT /api/categories/:categoryId
 * @access Private/Admin
 */
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params; 
    console.log(`Attempting to update category ID: ${categoryId} with new name: ${name}`); // Log initiation

    if (!name) {
      console.log(`Update category ID: ${categoryId} failed: Name is required.`); // Log validation failure
      return res.status(400).json({ error: "Category name is required for update" });
    }

    const categoryToUpdate = await Category.findOne({ _id: categoryId });

    if (!categoryToUpdate) {
      console.log(`Update category failed: Category with ID ${categoryId} not found.`); // Log not found
      return res.status(404).json({ error: "Category not found" });
    }

    const existingWithName = await Category.findOne({ name, _id: { $ne: categoryId } });
    if (existingWithName) {
      console.log(`Update category ID: ${categoryId} failed: New name '${name}' already exists for another category.`); // Log conflict
      return res.status(409).json({ error: "Category name already exists for another category" });
    }

    categoryToUpdate.name = name;
    const updatedCategory = await categoryToUpdate.save();
    console.log(`Category ID: ${categoryId} updated successfully to name: ${updatedCategory.name}`); // Log success
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error); // Existing error logging
    res.status(500).json({ error: "Internal server error during category update" });
  }
});

/**
 * @desc Delete a category
 * @route DELETE /api/categories/:categoryId
 * @access Private/Admin
 */
const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params; 
    console.log(`Attempting to remove category ID: ${categoryId}`); // Log initiation

    const removed = await Category.findByIdAndDelete(categoryId);

    if (!removed) {
      console.log(`Remove category failed: Category with ID ${categoryId} not found.`); // Log not found
      return res.status(404).json({ error: "Category not found" });
    }

    console.log(`Category ID: ${categoryId} removed successfully.`); // Log success
    // Send a success message with 200 OK
    res.status(200).json({ message: "Category removed successfully." }); 
    // Alternatively, for no content, use: res.status(204).send();
  } catch (error) {
    console.error("Error removing category:", error); // Existing error logging
    res.status(500).json({ error: "Internal server error during category removal" });
  }
});

/**
 * @desc Get all categories
 * @route GET /api/categories
 * @access Public
 */
const listCategory = asyncHandler(async (req, res) => {
  try {
    console.log("Attempting to list all categories."); // Log initiation
    const all = await Category.find({});
    console.log(`Successfully listed ${all.length} categories.`); // Log success
    res.json(all);
  } catch (error) {
    console.error("Error listing categories:", error); // Existing error logging
    res.status(500).json({ error: "Internal server error during category listing" });
  }
});

/**
 * @desc Get a single category by ID
 * @route GET /api/categories/:categoryId
 * @access Public
 */
const readCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log(`Attempting to read category ID: ${categoryId}`); // Log initiation
    const category = await Category.findOne({ _id: categoryId });
    
    if (!category) {
      console.log(`Read category failed: Category with ID ${categoryId} not found.`); // Log not found
      return res.status(404).json({ error: "Category not found" });
    }
    console.log(`Successfully read category ID: ${categoryId} - ${category.name}`); // Log success
    res.json(category);
  } catch (error) {
    console.error("Error reading category:", error); // Existing error logging
    res.status(500).json({ error: "Internal server error during category retrieval" });
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
