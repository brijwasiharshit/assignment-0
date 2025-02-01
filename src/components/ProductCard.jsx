import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editItem,
  removeItem,
  toggleEditProduct,
  toggleAddProduct,
  setEditId,
} from "../assets/redux/productSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const showAddForm = useSelector((store) => store.myproduct.buttons.addProductBtn);
  const showEditForm = useSelector((store) => store.myproduct.buttons.editProductBtn);

  const handleEdit = async () => {
    console.log("edit button clicked!");
    dispatch(toggleEditProduct());
    dispatch(setEditId(product.id));
  };

  const handleDelete = () => {
    console.log("delete button clicked!");
    dispatch(removeItem(product));
  };

  return (
    <div className="relative mx-auto my-12 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="relative mx-3 mt-3 flex h-48 overflow-hidden rounded-xl">
        <img
          className="object-cover"
          src={product?.images?.[0] || "/path/to/local/fallback-image.jpg"} // Use a local fallback
          alt={`Image of ${product?.title}`} // More descriptive alt text
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
          {product.discountPercentage}% OFF
        </span>
      </div>
      <div className="mt-3 px-3 pb-4">
        <div className="mx-auto">
          <h5 className="text-lg tracking-tight text-slate-900">
            {product?.title}
          </h5>
        </div>
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-slate-900">
              ${product?.price}
            </span>
          </p>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className={`h-4 w-4 ${index < product.rating ? "text-yellow-300" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="mr-2 ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {product?.rating}
            </span>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleEdit}
            aria-label="Edit Product"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            aria-label="Delete Product"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;