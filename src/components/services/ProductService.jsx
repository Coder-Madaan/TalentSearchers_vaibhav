// src/services/productService.js
export const fetchProducts = async () => {
  try {
    const response = await fetch('/products.json'); // Fetch the local JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
