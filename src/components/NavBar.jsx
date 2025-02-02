import React from "react";
import LOGO from "../assets/images/logoipsum-347.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleAddProduct,
  toggleEditProduct,
  setEditId,
  setInitialItems,
} from "../assets/redux/productSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.myproduct.products);

  const handleSort = () => {
    console.log("clicked sort");
    const sorted = [...products].sort((a, b) => a.price - b.price);
    dispatch(setInitialItems(sorted));
  };

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
    <nav className="bg-white bg-opacity-10 backdrop-blur-md text-white p-4 shadow-lg rounded-b-2xl">
      <div className="container mx-auto flex justify-between items-center px-6 flex-wrap">
        
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-32 drop-shadow-lg" src={LOGO} alt="logo" />
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-lg font-semibold">
          <li className="text-amber-500 hover:text-blue-400 transition duration-300 cursor-pointer flex items-center gap-2">
            <span role="img" aria-label="home">🏠</span> Home
          </li>
          <li className="text-amber-500 hover:text-blue-400 transition duration-300 cursor-pointer flex items-center gap-2">
            <span>ℹ️</span> About Us
          </li>
          <li className="text-amber-500 hover:text-blue-400 transition duration-300 cursor-pointer flex items-center gap-2">
            <span role="img" aria-label="contact">📞</span> Contact
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex gap-4 mt-3 sm:mt-0">
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-110"
          >
            {isShowAddButton ? "Close" : "Add Product"}
          </button>
          <button
            onClick={handleSort}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all transform hover:scale-110"
          >
            Sort by Price
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
