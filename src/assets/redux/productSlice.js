import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "myproducts",
  initialState: {
    items: [],
    addProductMenu: false,
  },
  reducers: {
    setInitialItems: (state,action) => {
        state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {},
    editItem: (state, action) => {},
    invertAddProductMenu: (state, action) => {
      state.addProductMenu = action.payload.addProductBtnState;
    },
  },
});

export const { setInitialItems, addItem,removeItem,editItem,invertAddProductMenu } = productSlice.actions;

export default productSlice.reducer;
