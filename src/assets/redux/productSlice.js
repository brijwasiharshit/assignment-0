import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "myproduct",
  initialState: {
    products: [],
    buttons: {
      addProductBtn: false,
      editProductBtn: false,
    },
    editId: null,
   
    
  },
  reducers: {
    setInitialItems: (state, action) => {
      state.products = action.payload;
    },
    addItem: (state, action) => {
      state.products.push(action.payload);
    },
    editItem: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    setEditId: (state, action) => {
      state.editId = action.payload || null;
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter((item) => item.id !== id);
    },
    clearAll: (state) => {
      state.products = [];
    },
    toggleAddProduct: (state) => {
      state.buttons.addProductBtn = !state.buttons.addProductBtn;
      if (state.buttons.addProductBtn) {
        state.buttons.editProductBtn = false; // Ensure edit form is closed
      }
    },
    toggleEditProduct: (state) => {
      state.buttons.editProductBtn = !state.buttons.editProductBtn;
      if (state.buttons.editProductBtn) {
        state.buttons.addProductBtn = false; // Ensure add form is closed
      }
    },
   
  },
});

export const {
  addItem,
  removeItem,
  clearAll,
  setInitialItems,
  toggleAddProduct,
  toggleEditProduct,
  editItem,
  setEditId,
 
} = productSlice.actions;

export default productSlice.reducer;