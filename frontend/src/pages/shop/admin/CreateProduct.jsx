import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '@/store/productSlice';
import { fetchCategories } from '@/store/categorySlice';
import { uploadImage } from '../../../lib/uploadImage'; // Assuming this path is correct
import FormComp from '@/components/FormComp'; // Your generic form component
import { schema ,fields as staticFields,initialValues } from "./data"

// It's assumed 'schema', 'fields', and 'initialValues' are correctly defined in './data'
// For example:
// import { schema, fields as staticFields, initialValues } from './data';

const CreateProduct = () => {
    // State to hold form fields, potentially updated with dynamic options (like categories)
    const [fields, setFields] = useState(staticFields);

    const dispatch = useDispatch();

    // Effect to fetch categories and update the form fields with options
    useEffect(() => {
        const loadCategories = async () => {
            try {
                // Dispatch fetchCategories and unwrap the result to get the actual data
                const categories = await dispatch(fetchCategories()).unwrap();

                console.log('Frontend: Fetched categories successfully:', categories);

                // Map fetched categories to { value, label } format for dropdown options
                const options = categories.map((cat) => ({
                    value: cat._id,
                    label: cat.name,
                }));

                // Update the 'category' field in your staticFields with the fetched options
                const updatedFields = staticFields.map((field) =>
                    field.name === 'category' ? { ...field, options } : field
                );

                setFields(updatedFields); // Set the updated fields to component state

            } catch (err) {
                console.error('Frontend Error: Failed to fetch categories:', err);
                // Optionally handle error in UI, e.g., display a toast message
            }
        };

        loadCategories(); // Call the async function
    }, [dispatch]); // Dependency array includes dispatch to avoid lint warnings, though it's stable

    /**
     * Handles the product creation process after form submission.
     * This function receives the form data from `FormComp`.
     * @param {Object} formData - The data submitted from the form.
     * Expected to be a flat object like:
     * { name: string, description: string, ..., image: File | FileList }
     */
    const handleCreateProducts = async (formData) => {
        console.log("--- Frontend: handleCreateProducts function started ---");
        console.log("Frontend: Data received from FormComp (before image upload):", formData);

        let imageUrl = '';

        // Check if an image file was provided and needs uploading
        if (formData.image) {
            // Ensure we get a single File object, regardless if it's FileList or a single File
            const file = formData.image instanceof FileList ? formData.image[0] : formData.image;

            if (file) {
                console.log('Frontend: Attempting to upload image file:', file.name, file.type, file.size);
                try {
                    // Call the external image upload utility
                    imageUrl = await uploadImage(file);
                    console.log('Frontend: Image uploaded successfully. URL:', imageUrl);
                } catch (uploadError) {
                    console.error('Frontend Error: Image upload failed:', uploadError);
                    // Optionally show an error message to the user here
                    return; // Stop product creation if image upload fails
                }
            } else {
                console.warn('Frontend Warning: formData.image existed but was not a valid File or FileList[0]. Skipping image upload.');
            }
        }

        // Construct the final payload to be sent to the backend
        // This ensures the image field in the payload is the URL, not the File object
        const productPayload = {
            ...formData, // Spread all other form fields (name, description, price, etc.)
            image: imageUrl, // Override the image field with the URL
        };

        console.log("Frontend: Final product payload ready for dispatch:", productPayload);

        try {
            // Dispatch the createProduct async thunk to send data to your backend
            const resultAction = await dispatch(createProduct(productPayload)).unwrap();
            console.log('Frontend: Product created successfully via Redux dispatch:', resultAction);
            // Optionally clear form or show success message to the user
            alert("Product created successfully!"); // Using alert for demo, consider custom modal
            // navigate to product list or clear form
        } catch (error) {
            console.error('Frontend Error: Product creation failed at Redux dispatch:', error);
            // Error handling from backend (e.g., validation errors) will be in 'error' here
            // Display specific error message if available
            const errorMessage = error?.error?.message || error?.message || "An unknown error occurred during product creation.";
            alert(`Product creation failed: ${errorMessage}`); // Using alert for demo
        }
        console.log("--- Frontend: handleCreateProducts function finished ---");
    };

    return (
        <div className="px-20 pt-10">
            {/* FormComp is responsible for rendering the form and providing data to onSubmit */}
            <FormComp
                schema={schema}
                fields={fields} // Pass the dynamically updated fields
                initialValues={initialValues}
                submitBtnText="Create Product"
                onSubmit={handleCreateProducts} // Pass the handler
            />
        </div>
    );
};

export default CreateProduct;
