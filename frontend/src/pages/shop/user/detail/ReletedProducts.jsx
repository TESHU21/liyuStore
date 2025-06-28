import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard';

const ReletedProducts = () => {
  const selectedProduct = useSelector((state) => state.selectedProduct.product);
  const products = useSelector((state) => state.products.products);

  const relatedProducts = useMemo(() => {
    if (!selectedProduct || !selectedProduct.category) return [];
    return products.filter(
      (item) =>
        item._id !== selectedProduct._id && // avoid showing the selected product itself
        item.category?.includes(selectedProduct.category)
    );
  }, [selectedProduct, products]);

  if (!selectedProduct) return null;

  return (
    <div className="flex flex-wrap gap-6">
      {relatedProducts.length > 0 ? (
        relatedProducts.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))
      ) : (
        <p className=' text-center'>No related products found.</p>
      )}
    </div>
  );
};

export default ReletedProducts;
