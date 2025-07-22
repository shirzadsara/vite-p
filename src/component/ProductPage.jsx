import React from 'react';

import { useParams,useNavigate } from 'react-router-dom';
import { useGetProductsQuery,useUpdateCartMutation,useGetCartQuery,useAddToCartMutation,useDeleteCartMutation } from '../features/products/productApi';
import QuantitySelector from './QuantitySelector';

export default function ProductPage() {
  const { id } = useParams(); 
  const navigate=useNavigate()// 🧠 id از URL دریافت میشه
  
  const [addToCart]  = useAddToCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();


  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const { data: cart = [] } = useGetCartQuery();

  if (isLoading) return <p>در حال بارگذاری اطلاعات محصول...</p>;
  if (isError) return <p>خطا در بارگذاری اطلاعات محصول</p>;

  const product = products.find(p => p.id.toString() === id);

  if (!product) return <p>محصول مورد نظر یافت نشد.</p>;



  const found = cart.find(item => item.id === product.id);
const initialQty= found ? found.quantity : 0;
  
const handleQuantityChangeDec = (id, quantity) => {
    if (quantity === 0) {
      deleteCart(id); // حذف از سبد
    } else {
      updateCart({ id, quantity }); // بروزرسانی مقدار
    }
  };
const handleQuantityChangeIn = (qty) => {
  if (found) {
    // اگر پیدا شد، فقط تعداد رو آپدیت کن
    updateCart({ id: product.id, quantity: qty });
  } else {
    // اگر نبود، اضافه کن
    addToCart({
      id: product.id,
      titlle: product.titlle,
      price: product.price,
      photo: product.photo,
      quantity: qty,
    });
  }
};


  return (
    <div>
    <div className='flex flex-col lg:flex-row space-x-2 mt-20'>
      <img src={product.photo} alt={product.titlle} width="200" />
      
      <div className='space-y-2'>
      <h2  className='font-bold text-2xl'>{product.titlle}</h2>
      <p className='text-indigo-900'>قیمت: {product.price.toLocaleString()} تومان</p>
      
       <div>
        <span className="mr-4 font-medium">تعداد:</span>
            <QuantitySelector 
             initial={initialQty}
             onChangeDec={(qty) => handleQuantityChangeDec(product.id, qty)} 
             onChangeIn={ handleQuantityChangeIn}
            />
            <p className='text-sm text-center mt-2 text-green-700'>موجوددرانبار </p>
          </div>
             <div className="mt-3 ">
        <button className="text-white text-center w-40 bg-indigo-900 cursor-pointer" onClick={() => navigate("/cart")}>
         سبد خرید
        </button>
      </div>
      </div>
      
    </div>
     <p className='mt-16 mb-5'>توضیحات: {product.description}</p>
      <button  className='mb-6 text-indigo-900 hover:underline'
      onClick={() => navigate("/")}
      >بازگشت </button>
     </div>
  );
}
