import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    ...product,
    images: product.images || [""], // Ensure `images` is always an array
  });

  // Handle change for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedProduct((prevState) => ({
      ...prevState,
      [name]:
        name === "price" || name === "discountPercentage"
          ? value ? parseFloat(value) : ""
          : value,
    }));
  };

  // Handle Image Change Separately
  const handleImageChange = (e) => {
    setEditedProduct((prevState) => ({
      ...prevState,
      images: [e.target.value], // Ensure immutability
    }));
  };

  // Handle save action
  const handleSave = () => {
    setIsEditing(false);
    console.log("Product saved:", editedProduct);
  };

  return (
    <div className="relative mx-auto my-12 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <a className="relative mx-3 mt-3 flex h-48 overflow-hidden rounded-xl" href="#">
        <img className="object-cover" src={editedProduct.images[0]} alt="product image" />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
          {editedProduct.discountPercentage}% OFF
        </span>
      </a>
      <div className="mt-3 px-3 pb-4">
        <a href="#" className="mx-auto">
          <h5 className="text-lg tracking-tight text-slate-900">{editedProduct.title}</h5>
        </a>
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-slate-900">${editedProduct.price}</span>
          </p>
          <div className="flex items-center">
            {Array.from({ length: Math.floor(editedProduct.rating) }).map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className="h-4 w-4 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="mr-2 ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {editedProduct.rating}
            </span>
          </div>
        </div>
        {isEditing ? (
          <div className="mt-4">
            <div className="mb-3">
              <label className="block text-xs">Product Name</label>
              <input
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs">Price</label>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs">Image URL</label>
              <input
                type="text"
                name="image"
                value={editedProduct.images[0]}
                onChange={handleImageChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs">Discount</label>
              <input
                type="number"
                name="discountPercentage"
                value={editedProduct.discountPercentage}
                onChange={handleInputChange}
                className="w-full p-1 border rounded text-sm"
              />
            </div>
            <div className="flex justify-between gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1.5 w-16 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 w-16 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 w-16 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button className="px-3 py-1.5 w-16 bg-red-400 text-white rounded-md hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
