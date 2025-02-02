import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import AddNewProduct from "./AddNewProduct";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { setInitialItems } from "../assets/redux/productSlice";

const Body = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const products = useSelector((store) => store.myproduct.products);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      dispatch(setInitialItems(data.products));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-500 to-green-500">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          {/* Add New Product Section */}
          <div className="mb-8">
            <AddNewProduct />
          </div>

          {/* Product Grid */}
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