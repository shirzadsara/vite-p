import { configureStore} from "@reduxjs/toolkit";
//import productsReducer,{fetchproducts} from "../slice/productsSlice";
//import cartReducer,{getTotal} from "../slice/cartSlice";
//import {productApi} from "./slice/productApi";

import {productApi} from "../features/products/productApi"
export const store=configureStore ({
    reducer:{
        //products:productsReducer,
       // cart:cartReducer,
        [productApi.reducerPath]:productApi.reducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
    
});

//store.dispatch(fetchproducts());
//store.dispatch(getTotal());