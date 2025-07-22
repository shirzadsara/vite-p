import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    item:[],
    status:null,
};

export const fetchproducts=createAsyncThunk(
    "product/fetchproducts",
    async ()=>{
        try{
            const response=await axios.get("http://localhost:9000/DrillingMachines");
            return response.data;
        }
        catch(err){
console.log(err);
        }
    }
);
const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    exteraReducers: {
        [fetchproducts.pending]:(state,action) =>{
            state.status="pending";
        },
        [fetchproducts.fulfilled]:(state,action) =>{
            state.status="success";
        },
    [fetchproducts.rejected]:(state,action) =>{
        state.status="rejected";
    },
        
    }
});

export default productsSlice.reducer;