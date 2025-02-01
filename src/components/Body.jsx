import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import AddNewProduct from "./AddNewProduct";
import { setInitialItems } from "../assets/redux/productSlice";

const Body = () => {
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [products, setProducts] = useState([]); 
  const dispatch = useDispatch();

  // To set on or off the add product component
  const addProductState = useSelector((store) => store.myproducts.addProductMenu);
  const productsFromStore = useSelector((store) => store.myproducts.items); // Get products from the Redux store

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      dispatch(setInitialItems(data.products)); // Dispatch products to the store
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // Set loading state to false once data is fetched
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Sync local state with Redux state when it changes
    setProducts(productsFromStore);
  }, [productsFromStore]);

  if (isLoading) {
    return <div>Loading...</div>; // Add loading UI
  }

  return (
    <div className="container mx-auto px-4">
      {/* Conditionally render Add New Product form */}
      {addProductState ? (
        <AddNewProduct />
      ) : (
        <>
          <h2 className="text-3xl font-semibold text-center my-6 text-gray-700">
            Products List
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
