
// src/components/Layout.jsx
import { Outlet} from 'react-router-dom';
import { FaInstagramSquare } from "react-icons/fa";
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className=''>
      <main>
        <Outlet />
      </main>
      <footer className="py-4 mt-20 text-indigo-900">
       <h1> © 2025 حفاری شیرزاد </h1>
       <p>تماس : 09171130126</p>
       <div  className='flex'>
        <p>اینستاگرام</p>
        <FaInstagramSquare />
       </div>
      </footer>
      </div>
    </>
  );
}
