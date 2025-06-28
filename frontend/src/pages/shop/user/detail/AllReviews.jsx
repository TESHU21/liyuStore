import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductReview } from '@/store/productSlice';
import ReviewCard from './ReviewCard';

const AllReviews = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.selectedProduct.product);
  const reviews = useSelector((state) => state.products.reviews);

  useEffect(() => {
    const fetchAllReviews = async () => {
      if (!product?._id) return; // Avoid running if product ID is not available

      try {
        await dispatch(fetchProductReview(product._id)).unwrap();
      } catch (err) {
        console.error('❌ Failed to fetch reviews:', err);
      }
    };

    fetchAllReviews();
  }, [dispatch, product?._id]);

  return (
    <div className="space-y-4 mt-6">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))
      ) : (
        <p className="text-gray-500 italic text-center">No reviews for this product.</p>
      )}
    </div>
  );
};

export default AllReviews;
