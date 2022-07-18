import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetail } from "../store/actions";
import rupiahFormat from "../helpers/rupiahFormat";
import PulseLoader from "react-spinners/PulseLoader";

function DetailPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const productDetail = useSelector((state) => {
    return state.detail.productDetail;
  });

  useEffect(() => {
    dispatch(fetchDetail(productId));
    setLoading(true);
  }, [dispatch]);

  useEffect(() => {
    if (productDetail) {
      if (Object.keys(productDetail).length) {
        setLoading(false);
      }
    }
  }, [productDetail]);

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
            <div className="grid grid-cols-3 gap-x-12">
              <div className="col-span-2">
                <img
                  className="mx-auto mb-12"
                  src={productDetail.mainImg}
                  alt=""
                />
                <div className="flex overflow-x-auto">
                  {productDetail.Images?.map((image, index) => {
                    return (
                      <img
                        src={image.imgUrl}
                        alt=""
                        className="w-1/4 p-3 hover:border-gray-200 border-transparent border-2 rounded-xl"
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-darkSmalt">
                  {productDetail.name}
                </h1>
                <p className="mt-3">{productDetail.overview}</p>
                <p className="mt-2 font-bold text-2xl">
                  <span className="mr-1 text-sm align-top">Rp</span>
                  {rupiahFormat(productDetail.price)}
                </p>
                <div className="mt-4 border-t border-gray-200 pt-8" />
                <div>
                  <h1 className="text-2xl font-bold text-darkSmalt">
                    Product Detail
                  </h1>
                  <p className="mt-3 text-justify">
                    {productDetail.description}
                  </p>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-8" />
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="items-center px-4 py-3 w-1/2 border border-transparent text-sm font-medium rounded-md shadow-sm text-cola bg-tangerine hover:bg-darkTangerine"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="items-center px-4 py-3 w-1/2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-smalt hover:bg-darkSmalt"
                  >
                    Add to Favorite
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default DetailPage;
