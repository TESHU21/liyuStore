import React from "react";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useCreateReviewMutation } from "@/store/api/productsApi";
import { useGetCurrentUserProfileQuery } from "@/store/api/authApi";
import FormComp from "@/components/FormComp";

const ReviewForm = () => {
  const [createReviewMutation, { isLoading, error, data }] =
    useCreateReviewMutation();

  const ReviewSchema = z.object({
    rating: z.preprocess(
      (val) => Number(val),
      z
        .number()
        .int()
        .min(1, "Minimum rating is 1")
        .max(5, "Maximum rating is 5"),
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
    {
      name: "rating",
      placeholder: "Rating (1-5)",
      label: "Rating",
      type: "number",
      className: "col-span-2",
    },
    {
      name: "comment",
      placeholder: "Write a comment...",
      label: "Comment",
      type: "textarea",
      className: "col-span-2",
    },
  ];

  const token = localStorage.getItem("token");
  const { data: profileData } = useGetCurrentUserProfileQuery(undefined, {
    skip: !token,
  });
  const user = profileData?.user || profileData;
  const product = useSelector((state) => state.selectedProduct.product);

  const handleSubmitReview = async (formData) => {
    try {
      if (!user) {
        return;
      }
      await createReviewMutation({
        id: product._id,
        reviewData: formData,
      }).unwrap();
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className=" w-full md:min-w-[668px] px-6">
        <FormComp
          schema={ReviewSchema}
          initialValues={initialValues}
          fields={fields}
          onSubmit={handleSubmitReview}
          loading={isLoading}
          error={error?.data?.message || error?.message}
          success={data}
        />
      </div>
    </div>
  );
};

export default ReviewForm;
