//import React from "react";

import { useNavigate } from 'react-router-dom';

import {useGetProductsQuery}  from "../features/products/productApi";

function ProductsList() {

  const navigate = useNavigate();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت محصولات</p>;


  
  return (

    <div>

    <h1 className="text-3xl mt-4 text-center text-indigo-950 font-bold underline">
        محصولات حفاری شیرزاد
      </h1>

<div className="mt-15 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" >
  
        {products.map(p => (
          <div   key={p.id} className="text-sm flex flex-col justify-between  font-bold rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow p-2">
            <div>
             <img className="w-full cursor-pointer"    onClick={() => navigate(`/product/${p.id}`)} src={p.photo} alt={p.titlle}  />
             </div>
            <div className="p-2 space-y-2 mt-2 ">
            <p>{p.titlle}</p>
            <p> {p.price} تومان</p>
            </div>
          </div>
        ))}

        </div>
      </div>

  );
}

export default ProductsList;
