import React, { useEffect, useState } from 'react';
import { fetchProducts } from './services/productService';
import ProductDetailsModal from './ProductDetailsModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [priceFilter, setPriceFilter] = useState('');
  const [popularityFilter, setPopularityFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [priceSortOrder, setPriceSortOrder] = useState(''); 
  const [popularitySortOrder, setPopularitySortOrder] = useState(''); 

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        const productsArray = Object.values(data.products);
        setProducts(productsArray);
        setFilteredProducts(productsArray);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split('-');
      filtered = filtered.filter(product => {
        const price = parseInt(product.price);
        return price >= minPrice && (maxPrice === '+' || price <= maxPrice);
      });
    }

    if (popularityFilter) {
      const [minPopularity, maxPopularity] = popularityFilter.split('-');
      filtered = filtered.filter(product => {
        const popularity = parseInt(product.popularity);
        return popularity >= minPopularity && (maxPopularity === '+' || popularity <= maxPopularity);
      });
    }

    if (priceSortOrder) {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.price);
        const priceB = parseInt(b.price);
        return priceSortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    if (popularitySortOrder) {
      filtered.sort((a, b) => {
        const popularityA = parseInt(a.popularity);
        const popularityB = parseInt(b.popularity);
        return popularitySortOrder === 'asc' ? popularityA - popularityB : popularityB - popularityA;
      });
    }

    setFilteredProducts(filtered);
  }, [priceFilter, popularityFilter, priceSortOrder, popularitySortOrder, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCustomPageChange = (e) => {
    const pageNumber = Number(e.target.value);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductDetails = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error fetching products: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-md shadow-md mb-8">
        <h1 className="text-3xl font-bold text-center">🛍️ Product Dashboard</h1>
      </nav>

      {/* Filters */}
      <div className="flex justify-center space-x-4 mb-4">
        <select
          className="border p-2 rounded-md bg-white shadow-sm"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-5000">0 - 5000</option>
          <option value="5000-10000">5000 - 10000</option>
          <option value="10000-20000">10000 - 20000</option>
          <option value="20000-+">20000+</option>
        </select>

        <select
          className="border p-2 rounded-md bg-white shadow-sm"
          value={popularityFilter}
          onChange={(e) => setPopularityFilter(e.target.value)}
        >
          <option value="">All Popularities</option>
          <option value="0-10000">0 - 10000</option>
          <option value="10000-30000">10000 - 30000</option>
          <option value="30000-50000">30000 - 50000</option>
          <option value="50000-+">50000+</option>
        </select>
      </div>

      {/* Sorting */}
      <div className="flex justify-center space-x-4 mb-8">
        <div>
          <label className="mr-2 font-semibold">Sort by Price:</label>
          <select
            className="border p-2 rounded-md bg-white shadow-sm"
            value={priceSortOrder}
            onChange={(e) => setPriceSortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Sort by Popularity:</label>
          <select
            className="border p-2 rounded-md bg-white shadow-sm"
            value={popularitySortOrder}
            onChange={(e) => setPopularitySortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <table className="table-auto w-full border-collapse shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <th className="p-3 border text-left">Title</th>
            <th className="p-3 border text-left">Price</th>
            <th className="p-3 border text-left">Popularity</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr
              key={index}
              onClick={() => handleProductClick(product)}
              className="cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <td className="p-3 border">{product.title}</td>
              <td className="p-3 border">{product.price}</td>
              <td className="p-3 border">{product.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {currentPage > 3 && <button onClick={() => handlePageChange(1)} className="p-2 rounded bg-gray-200">1</button>}
        {currentPage > 4 && <span className="p-2">...</span>}

        {Array.from({ length: Math.min(6, totalPages) }, (_, index) => {
          const pageNumber = Math.max(1, currentPage - 3) + index;
          if (pageNumber <= totalPages) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`p-2 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}

        {currentPage < totalPages - 3 && <span className="p-2">...</span>}
        {currentPage < totalPages - 2 && <button onClick={() => handlePageChange(totalPages)} className="p-2 rounded bg-gray-200">{totalPages}</button>}

        {/* Custom Page Input */}
        <input
          type="number"
          min="1"
          max={totalPages}
          placeholder="Page #"
          value={currentPage}
          onChange={handleCustomPageChange}
          className="p-2 border rounded-md w-20"
        />
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductDetails}
        />
      )}
    </div>
  );
};

export default ProductList;
