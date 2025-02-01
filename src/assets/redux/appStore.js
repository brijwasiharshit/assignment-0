import productReducer from './productSlice';
import { configureStore } from "@reduxjs/toolkit"
const appStore = configureStore({
    reducer: {
        'myproduct': productReducer
    }
})

export default appStore;