import { IoMenuSharp} from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

import ProductSearch from "./ProductSerch";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCartQuery } from '../features/products/productApi';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { data: cart = [] } = useGetCartQuery();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="bg-indigo-900 text-white shadow py-3 px-4">
      <div className="mx-10 flex justify-between items-center">
        <div className="flex space-x-2">
        <Link to="/" className="text-2xl font-bold">حفاری شیرزاد</Link>
         <ProductSearch />
         </div>
         <div className="flex text-center items-center space-x-2">
        {/* دکمه همبرگر برای موبایل */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          <IoMenuSharp/>
        </button>

        {/* لینک‌ها */}
        <div className={`${open ? 'block' : 'hidden'} hidden lg:flex space-x-6`}>
          <Link to="/" className="block py-2">خانه</Link>
          <Link to="/about" className="block py-2">درباره</Link>
        </div>
   <Link to="/cart" className="relative text-2xl">
        <FaShoppingCart />
            {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        </div>
      </div>
    </nav>
  );
}
