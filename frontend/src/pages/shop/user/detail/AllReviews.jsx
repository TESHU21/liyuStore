import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductReviewsQuery } from "@/store/api/productsApi";
import ReviewCard from "./ReviewCard";

const AllReviews = () => {
  const product = useSelector((state) => state.selectedProduct.product);
  const { id: routeProductId } = useParams();
  const productId = routeProductId || product?._id;

  const { data, isLoading, isError } = useGetProductReviewsQuery(productId, {
    skip: !productId,
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
