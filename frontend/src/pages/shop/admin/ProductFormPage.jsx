import React, { useState, useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { createProduct, updateProduct, deleteProduct } from '@/store/productSlice';
import { fetchCategories } from '@/store/categorySlice';
import { uploadImage } from '../../../lib/uploadImage';
import FormComp from '@/components/FormComp';
import {
  schema,
  fields as staticFields,
  initialValues as baseInitialValues,
} from './data';

const ProductFormPage = ({
  productToEdit = null,
  setActiveTab,
  setIsEditingProducts,
  refreshProducts,
}) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(staticFields);
  const [initialValues, setInitialValues] = useState(baseInitialValues);
  const [formKey, setFormKey] = useState(0); // used to reset form after create
  const { loading,error,success}=useSelector((state)=>state.products.products)

  // 🔁 Fetch categories for the category select field
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await dispatch(fetchCategories()).unwrap();

        const categoryOptions = categories.map((cat) => ({
          value: cat._id,
          label: cat.name,
        }));

        const updatedFields = staticFields.map((field) =>
          field.name === 'category' ? { ...field, options: categoryOptions } : field
        );

        setFields(updatedFields);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    loadCategories();
  }, [dispatch]);

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

  // 📦 Handle form submission for both create and update
  const handleSubmit = async (formData) => {
    let imageUrl = productToEdit?.image || '';

    // 🖼️ Upload new image if it's a File (not an existing URL)
    const file = formData.image instanceof FileList ? formData.image[0] : formData.image;
    if (file && typeof file !== 'string') {
      try {
        imageUrl = await uploadImage(file);
      } catch (uploadError) {
        alert('Image upload failed. Please try again.');
        return;
      }
    }

    const payload = {
      ...formData,
      image: imageUrl,
    };

    try {
      if (productToEdit) {
        await dispatch(updateProduct({ id: productToEdit._id, data: payload })).unwrap();
        alert('Product updated successfully!');
      } else {
        await dispatch(createProduct(payload)).unwrap();
        alert('Product created successfully!');
        setInitialValues(baseInitialValues);
        setFormKey((prev) => prev + 1); // reset form
      }
    } catch (error) {
      const errorMessage =
        error?.error?.message || error?.message || 'An unknown error occurred.';
      alert(`${productToEdit ? 'Update' : 'Creation'} failed: ${errorMessage}`);
    }
  };

  // ❌ Handle deletion of a product
  const handleDelete = async () => {
    if (!productToEdit) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteProduct(productToEdit._id)).unwrap();
      await refreshProducts(); // refresh product list
      setIsEditingProducts(null);
      setActiveTab('products');
      alert('Product deleted successfully!');
    } catch (error) {
      alert(`Delete failed: ${error?.message || 'An unknown error occurred.'}`);
    }
  };

  return (
    <div className="px-20 pt-10 space-y-4">
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
        submitBtnText={productToEdit ? 'Update' : 'Create'}
        onSubmit={handleSubmit}
        errorMessage={error}
        isLoading={loading}
        successMessage={success}
        
        
      />
    </div>
  );
};

export default ProductFormPage;
