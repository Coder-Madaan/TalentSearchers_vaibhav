import React from 'react';

const ProductDetailsModal = ({ product, closeProductDetails }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">{product.title}</h2>
        <p className="mb-2">
          <strong>Price:</strong> Rs. {product.price}
        </p>
        <p className="mb-2">
          <strong>Popularity:</strong> {product.popularity}
        </p>
        <p>
          <strong>Description:</strong>{' '}
          {product.description || 'No description available'}
        </p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={closeProductDetails}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
