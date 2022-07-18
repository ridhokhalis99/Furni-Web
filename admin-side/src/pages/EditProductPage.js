import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { fetchProduct } from "../store/actions";
import ProductForm from "../components/ProductForm";
import PulseLoader from "react-spinners/PulseLoader";

function EditProductPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const product = useSelector((state) => {
    return state.product.product;
  });

  useEffect(() => {
    dispatch(fetchProduct(productId));
    setLoading(true);
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      if (Object.keys(product)) {
        setLoading(false);
      }
    }
  }, [product]);

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
        <ProductForm product={product} />
      )}
    </React.Fragment>
  );
}

export default EditProductPage;
