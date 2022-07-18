import ProductCard from "../components/ProductCard";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/actions";
import PulseLoader from "react-spinners/PulseLoader";

function ProductsPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => {
    return state.product.products;
  });

  useEffect(() => {
    dispatch(fetchProducts());
    setLoading(true);
  }, [dispatch]);

  useEffect(() => {
    if (products.length) {
      setLoading(false);
    }
  }, [products]);

  return (
    <React.Fragment>
      {loading ? (
        <div className="sweet-loading flex items-center h-screen">
          <PulseLoader
            loading={loading}
            size={20}
            color={"#002672"}
            className="mx-auto"
          />
        </div>
      ) : (
        <div className="bg-white">
          <div className="px-30 mt-20">
            <h1 className="text-3xl mb-8 font-semibold text-darkSmalt">
              All Products
            </h1>
            <div className="grid grid-cols-4 gap-12">
              {products.map((product) => {
                return <ProductCard product={product} key={product.id} />;
              })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ProductsPage;
