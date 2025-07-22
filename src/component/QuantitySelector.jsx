import { useState,useEffect } from "react";
import {useDeleteCartMutation } from '../features/products/productApi';
export default function QuantitySelector({ initial=0, onChangeDec,onChangeIn}) {
  const [deleteCart] = useDeleteCartMutation();
  const [value, setValue] = useState(initial);
  useEffect(() => {
    setValue(initial);
  }, [initial]);


  const decrease = () => {
    if (value>0) {
    const next =( value - 1);
    setValue(next);
    onChangeDec(next);
    }
    
  };

  const increase = () => {
    const next = value + 1;
    setValue(next);
    onChangeIn(next);
  };

  const onInputChange = (e) => {
    const num = parseInt(e.target.value);
    setValue(num);
    onChangeIn(num);
  };

  return (
    <>
    <div className="inline-flex items-center border rounded-md overflow-hidden">
      <button
        onClick={decrease}
        className="px-2 py-1 text-indigo-900 bg-gray-200 hover:bg-gray-300"
      >
        −
      </button>
      <input
        type="number"
        min="1"
        value={value}
         readOnly
        //onChange={onInputChange}
        className="w-12 text-center text-indigo-900 focus:outline-none"
      />
      <button
        onClick={increase}
        className="px-2 py-1 text-indigo-900 bg-gray-200 hover:bg-gray-300"
      >
        +
      </button>

    
    </div>
   
    </>
  );
}
