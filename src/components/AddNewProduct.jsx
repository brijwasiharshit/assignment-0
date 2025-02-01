import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, setEditId } from "../assets/redux/productSlice";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const showAddForm = useSelector((store) => store.myproduct.buttons.addProductBtn);
  const showEditForm = useSelector((store) => store.myproduct.buttons.editProductBtn);
  const editId = useSelector((store) => store.myproduct.editId);
  const products = useSelector((store) => store.myproduct.products);

  const formOpen = showAddForm || showEditForm;

  const name = useRef(null);
  const price = useRef(null);
  const image = useRef(null);
  const rating = useRef(null);
  const discount = useRef(null);

  useEffect(() => {
    if (showEditForm && editId) {
      const productToEdit = products.find((product) => product.id === editId);
      if (productToEdit) {
        name.current.value = productToEdit.title;
        price.current.value = productToEdit.price;
        image.current.value = productToEdit.image?.[0] || ""; // Add fallback
        rating.current.value = productToEdit.rating;
        discount.current.value = productToEdit.discountPercentage;
      }
    }
  }, [showEditForm, editId]); // Removed `products` from dependencies

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: editId || Date.now(),
      title: name.current.value,
      price: Number(price.current.value),
      image: [image.current.value],
      rating: Number(rating.current.value),
      discountPercentage: Number(discount.current.value) || 0,
    };

    if (showEditForm) {
      dispatch(editItem(newProduct));
      dispatch(setEditId(null)); // Reset edit mode after updating
    } else {
      dispatch(addItem(newProduct));
    }

    // Clear form fields if form is closed
    if (!formOpen) {
      name.current.value = "";
      price.current.value = "";
      image.current.value = "";
      rating.current.value = "";
      discount.current.value = "";
    }
  };

  return (
    <>
      {formOpen && (
        <div className="fixed top-12 right-0 p-4 m-4 min-w-[350px] bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-50 rounded-lg shadow-xl z-40">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {showEditForm ? "Edit Product" : "Enter Product Details"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input ref={name} type="text" id="name" className="w-full p-2 border-2 border-black rounded-md" required />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input ref={price} type="number" id="price" className="w-full p-2 border-2 border-black rounded-md" required />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input ref={image} type="text" id="image" className="w-full p-2 border-2 border-black rounded-md" required />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <input ref={rating} type="number" id="rating" min="1" max="5" className="w-full p-2 border-2 border-black rounded-md" required />
            </div>

            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                Discount
              </label>
              <input ref={discount} type="number" id="discount" className="w-full p-2 border-2 border-black rounded-md" />
            </div>

            <button type="submit" aria-label={showEditForm ? "Update Product" : "Submit Product"} className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              {showEditForm ? "Update Product" : "Submit Product"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddNewProduct;