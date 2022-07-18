import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/actions";
import ProductTable from "../components/ProductTable";
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
        <div className="py-2 px-30 mt-8">
          <Link
            className="inline-block mb-4 px-4 text-sm py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white font-medium"
            to="add"
          >
            Add Product
          </Link>
          <div className="w-full align-middle border-gray-300 shadow rounded-lg">
            <ProductTable products={products} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ProductsPage;
