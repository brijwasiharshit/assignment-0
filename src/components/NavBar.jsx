import React from "react";
import LOGO from "../assets/images/logoipsum-347.svg";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddProduct, toggleEditProduct, setEditId } from "../assets/redux/productSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const isShowAddButton = useSelector((store) => store.myproduct.buttons.addProductBtn);
  const isShowEditButton = useSelector((store) => store.myproduct.buttons.editProductBtn);

  const handleAddProduct = () => {
    dispatch(toggleAddProduct());
    if (isShowEditButton) {
      dispatch(toggleEditProduct()); 
      dispatch(setEditId(null));
    }
  };

  return (
    <nav className="bg-blue-600 fixed w-full z-20 top-0 border-b shadow-lg">
      <div className="max-w-screen-xl flex justify-between items-center p-4 text-white">
        <div className="bg-white p-2 rounded-lg">
          <img src={LOGO} className="h-8" alt="Logo" />
        </div>
        
        <div className="flex space-x-6">
          <a href="#home" className="text-white hover:text-gray-200">Home</a>
          <a href="#about" className="text-white hover:text-gray-200">About</a>
          <a href="#contact" className="text-white hover:text-gray-200">Contact</a>
        </div>
        
        <button onClick={handleAddProduct} className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-white hover:bg-gray-100">
          {isShowAddButton ? "Close" : "Add Product"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
