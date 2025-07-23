import { useGetCartQuery, useUpdateCartMutation,useDeleteCartMutation } from '../features/products/productApi';
import QuantitySelector from './QuantitySelector';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

export default function CartPage() {
  const { data: cart = [], isLoading, isError } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const navigate = useNavigate();

  if (isLoading) return <p>در حال بارگذاری سبد...</p>;
  if (isError) return <p className="text-red-600">خطا در دریافت سبد خرید</p>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChangeDec = (id, quantity) => {
    if (quantity === 0) {
      deleteCart(id); // حذف از سبد
    } else {
      updateCart({ id, quantity }); // بروزرسانی مقدار
    }
  };
  const handleQuantityChangeIn = (id, quantity) => {
    updateCart({ id, quantity});
  };
  return (
    <div className="rtl max-w-screen-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">سبد خرید شما</h1>
      {cart.length === 0 ? (
        <p>سبد خرید خالی است.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex  items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex cursor-pointer items-center space-x-4" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.photo} alt={item.titlle} className="w-16 h-16 object-cover rounded"/>
                <div>
                  <h2 className="font-semibold">{item.titlle}</h2>
                  <p>{item.price.toLocaleString()} تومان</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
             <QuantitySelector
              initial={item.quantity}
              onChangeDec={(qty) => handleQuantityChangeDec(item.id, qty)}
              onChangeIn={(qty) => handleQuantityChangeIn(item.id, qty)}
             />
                <p className="font-semibold">
                  {(item.price * item.quantity).toLocaleString()} تومان
                </p>
                <button
                className='text-red-700 cursor-pointer'
                onClick={() => deleteCart(item.id)}
                 >
                 <RxCross2 />
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-xl mt-4">
            مجموع کل: {total.toLocaleString()} تومان
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 w-full bg-indigo-700 text-white py-3 rounded hover:bg-indigo-900 transition"
          >
            ادامه به صفحه پرداخت
          </button>
        </div>
      )}
    </div>
  );
}
