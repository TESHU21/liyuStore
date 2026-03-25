import React from "react";
import { useSelector } from "react-redux";
import { useGetProductReviewsQuery } from "@/store/api/productsApi";
import ReviewCard from "./ReviewCard";

const AllReviews = () => {
  const product = useSelector((state) => state.selectedProduct.product);

  const { data, isLoading, isError } = useGetProductReviewsQuery(product?._id, {
    skip: !product?._id,
  });

  const reviews = Array.isArray(data)
    ? data
    : data?.reviews || data?.data || [];

  return (
    <div className="space-y-4 mt-6 px-6">
      {isLoading ? (
        <p className="text-gray-500 italic text-center">Loading reviews...</p>
      ) : isError ? (
        <p className="text-gray-500 italic text-center">
          Failed to load reviews.
        </p>
      ) : reviews && reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review._id} review={review} />)
      ) : (
        <p className="text-gray-500 italic text-center">
          No reviews for this product.
        </p>
      )}
    </div>
  );
};

export default AllReviews;
