// src/components/Dashboard.jsx
import React, { useState } from 'react';
import ProductList from './ProductList';


const Dashboard = () => {
  const [filter, setFilter] = useState({ price: '', popularity: '' });

  const handleFilterChange = (event, type) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: event.target.value,
    }));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <ProductList  />
    </div>
  );
};

export default Dashboard;
