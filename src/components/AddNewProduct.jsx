import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, invertAddProductMenu } from '../assets/redux/productSlice';
// import { addItem } from '../redux/productSlice';

const AddNewProduct = () => {
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState({
    name: '',
    price: '',
    images: ['https://picsum.photos/200/300'],
    rating: '',
    discount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]:
        name === "price" || name === "discount"
          ? value ? parseFloat(value) : ""
          : name === "rating"
          ? value ? parseInt(value, 10) : ""
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem(product));
    dispatch(invertAddProductMenu(false));
  };

  return (
    <div className="p-6 my-24 max-w-md mx-auto bg-white rounded-md shadow-md z-40">
      <h2 className="text-2xl font-semibold text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label htmlFor="name" className="block">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="rating" className="block">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={product.rating}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <label htmlFor="discount" className="block">Discount</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
