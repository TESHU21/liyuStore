import React from 'react';
import { z } from "zod";
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '@/store/productSlice';
import FormComp from '@/components/FormComp';

const ReviewForm = () => {
  const dispatch = useDispatch();

  const ReviewSchema = z.object({
    rating: z.preprocess(
      val => Number(val),
      z.number().int().min(1, "Minimum rating is 1").max(5, "Maximum rating is 5")
    ),
    comment: z
      .string()
      .min(5, { message: "Comment should contain at least 5 characters" })
      .max(50, { message: "Comment must not exceed 50 characters" }),
  });

  const initialValues = {
    rating: 1,
    comment: "",
  };

  const fields = [
    { name: "rating", placeholder: "Rating (1-5)", label: "Rating", type: "number", className: "col-span-2" },
    { name: "comment", placeholder: "Write a comment...", label: "Comment", type: "textarea", className: "col-span-2" },
  ];

  const { loading, error, success } = useSelector(state => state.products);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
      const product=useSelector((state)=>state.selectedProduct.product)
  
 

  const handleSubmitReview = async (formData) => {
    try {
      console.log("Submitting review...");
      const res = await dispatch(createReview({ id: product._id, formData })).unwrap();
      console.log("Review response:", res);
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className=' w-full md:min-w-[668px] px-6'>
        <FormComp
          schema={ReviewSchema}
          initialValues={initialValues}
          fields={fields}
          onSubmit={handleSubmitReview}
          loading={loading}
          error={error}
          success={success}
        />
      </div>
    </div>
  );
};

export default ReviewForm;
