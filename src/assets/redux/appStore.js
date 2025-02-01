import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice"; 

const store = configureStore({
    reducer: {
        myproducts: productReducer, 
    }
});

export default store;
