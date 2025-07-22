// src/components/ProductSearch.jsx
import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../features/products/productApi';

export default function productSearch() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const found = products.find(p =>
      p.titlle.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    if (found) {
   navigate(`/product/${found.id}`);

   
    } else {
      alert('محصول یافت نشد');
    }
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت محصولات</p>;

  return (
    <div  className="w-20 flex relative ">
      
      <input className=' border  border-b-blue-700 text-white'
        type="text"
        placeholder="جستجو..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
     <FiSearch className='absolute mr-41 mt-2 text-white cursor-pointer' onClick={handleSearch}  />
     

    </div>
  );
}
