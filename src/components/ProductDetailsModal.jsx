import React from 'react';

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg relative w-96">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <p><strong>Title:</strong> {product.title}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Popularity:</strong> {product.popularity}</p>
        
        <button
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times; 
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
