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
    <div className="container mx-auto px-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AddNewProduct />
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
