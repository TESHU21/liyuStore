import React, { useMemo, useState, useEffect } from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/store/api/productsApi";
import { useGetCategoriesQuery } from "@/store/api/catagoriesApi";
import { uploadImage } from "../../../lib/uploadImage";
import FormComp from "@/components/FormComp";
import {
  schema,
  fields as staticFields,
  initialValues as baseInitialValues,
} from "./data";

const ProductFormPage = ({
  productToEdit = null,
  setActiveTab,
  setIsEditingProducts,
  refreshProducts,
}) => {
  const [fields, setFields] = useState(staticFields);
  const [initialValues, setInitialValues] = useState(baseInitialValues);
  const [formKey, setFormKey] = useState(0); // used to reset form after create
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    return categoriesData?.categories || categoriesData?.data || [];
  }, [categoriesData]);

  const [createProductMutation, createState] = useCreateProductMutation();
  const [updateProductMutation, updateState] = useUpdateProductMutation();
  const [deleteProductMutation, deleteState] = useDeleteProductMutation();

  // 🔁 Fetch categories for the category select field
  useEffect(() => {
    const categoryOptions = categories.map((cat) => ({
      value: cat._id,
      label: cat.name,
    }));

    const updatedFields = staticFields.map((field) =>
      field.name === "category"
        ? { ...field, options: categoryOptions }
        : field,
    );

    setFields(updatedFields);
  }, [categories]);

  // 🧠 Pre-fill form if editing a product
  useEffect(() => {
    if (productToEdit) {
      setInitialValues({
        ...baseInitialValues,
        ...productToEdit,
        category: productToEdit.category?._id || productToEdit.category,
      });
    }
  }, [productToEdit]);

  // Handle form submission for both create and update
  const handleSubmit = async (formData) => {
    let imageUrl = productToEdit?.image || "";

    // 🖼️ Upload new image ONLY if it's a new file (not an existing URL)
    const file =
      formData.image instanceof FileList ? formData.image[0] : formData.image;

    console.log("Form data image:", formData.image);
    console.log("Extracted file:", file);
    console.log("File type:", typeof file);
    console.log("Is File?", file instanceof File);
    console.log("Is FileList?", formData.image instanceof FileList);

    // Only upload if it's a File object (new image selected)
    if (file instanceof File) {
      try {
        setIsUploadingImage(true);
        imageUrl = await uploadImage(file);
      } catch {
        alert("Image upload failed. Please try again.");
        return;
      } finally {
        setIsUploadingImage(false);
      }
    } else {
      // Keep existing image if no new file selected
      imageUrl = productToEdit?.image || "";
    }

    const payload = {
      ...formData,
      image: imageUrl,
    };

    console.log("Product Update Payload:", payload);
    console.log("Product ID:", productToEdit?._id);

    try {
      if (productToEdit) {
        await updateProductMutation({
          id: productToEdit._id,
          formData: payload,
        }).unwrap();
        alert("Product updated successfully!");
      } else {
        await createProductMutation(payload).unwrap();
        alert("Product created successfully!");
        setInitialValues(baseInitialValues);
        setFormKey((prev) => prev + 1); // reset form
      }

      if (refreshProducts) {
        await refreshProducts();
      }
    } catch (error) {
      const errorMessage =
        error?.error?.message || error?.message || "An unknown error occurred.";
      alert(`${productToEdit ? "Update" : "Creation"} failed: ${errorMessage}`);
    }
  };

  // ❌ Handle deletion of a product
  const handleDelete = async () => {
    if (!productToEdit) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await deleteProductMutation(productToEdit._id).unwrap();
      await refreshProducts(); // refresh product list
      setIsEditingProducts(null);
      setActiveTab("products");
      alert("Product deleted successfully!");
    } catch (error) {
      alert(`Delete failed: ${error?.message || "An unknown error occurred."}`);
    }
  };

  return (
    <div className="md:px-20 pt-10 space-y-4">
      <div className="flex justify-end">
        {productToEdit && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Product
          </button>
        )}
      </div>

      <FormComp
        key={formKey}
        schema={schema}
        fields={fields}
        initialValues={productToEdit ? initialValues : baseInitialValues}
        submitBtnText={productToEdit ? "Update" : "Create"}
        onSubmit={handleSubmit}
        errorMessage={
          createState?.error?.data?.message ||
          createState?.error?.message ||
          updateState?.error?.data?.message ||
          updateState?.error?.message
        }
        isLoading={
          createState.isLoading ||
          updateState.isLoading ||
          deleteState.isLoading ||
          isUploadingImage
        }
        successMessage={createState?.data || updateState?.data}
      />
    </div>
  );
};

export default ProductFormPage;
