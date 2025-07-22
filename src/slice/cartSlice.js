import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState={
    //ایتم های سبد خرید ب ابجکت جاوااسکریپت تبدیل میکنیم
 cartItems: localStorage.getItem("cartItems") ?
 JSON.parse(localStorage.getItem("cartItems")) :
 [],
 //تعداد
 cartTotalQty:0,
 //قیمت
 cartTotalAmount:0
}

const cartSlice=createSlice({
   name:"cart",
   initialState,
   reducers:{
    //اضافه کردن ایتم ب سبد خرید
    addToCart(state,action){
        //کاربر رو محصولی ک کلیک کرده .داخل سبد بوده ؟برای اینکار باید ایندکس محصول رو پیدا کنیم
        const existingIndex=state.cartItems.findIndex(
            item => item.id===action.payload.id
        );
        if(existingIndex >= 0){
            state.cartItems[existingIndex]={
              ...state.cartItems[existingIndex],
                cartQty:state.cartItems[existingIndex].cartQty+1,
            };
            toast.info("تعداد افزایش یافت",{position:"bottom-right"})
            }
            //اگه اضافه کردیم و در سبد نبود بیا خودشو (پوش کن)بزار تو ایتم های سبد 
            else {
                let tempProductItem={
                    ...action.payload,
                    cartQuery:action.payload.cartQty,
                };
                state.cartItems.push("tempProductItem");
                toast.success("محصول ب سبد خرید اضافه شد",
                    {position:"bottom-right",
                });
        }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems)
        )
    },
    getTotal(state,action) {
        let {total,qty}=state.cartItems.reduce(
            (cartTotal,cartItem) => {
                const {price,cartQty}=cartItem;
                const itemTotal=price*cartQty;
                cartTotal.total += itemTotal;
                cartTotal.qty += cartQuery;
                return cartTotal;
            },
            {
                total:0,
                qty:0
            }
        );
        total=parseFloat(total.toFixed());
        state.cartTotalQty=qty;
        state.cartTotalAmount=total;
    }
   },
});
export const {addToCart,getTotal}=cartSlice.actions;
export default cartSlice.reducer;