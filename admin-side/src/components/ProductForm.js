import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { updateProduct, fetchCategories } from "../store/actions";
import swal from "sweetalert";

function ProductForm(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = props;
  const formType = location.pathname.split("/").slice(-1)[0];
  const [images, setImages] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    overview: "",
    description: "",
    price: "",
    mainImg: "",
    categoryId: "",
  });

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      if (Object.keys(product).length) {
        setProductForm(product);
        setImages(product.Images);
      }
    }
  }, [product]);

  function addImages(e) {
    e.preventDefault();
    const temp = [...images];
    temp.push({ imgUrl: "" });
    setImages(temp);
  }

  function productChangeHandler(e) {
    const data = e.target.name;
    const value = e.target.value;
    const newData = {
      ...productForm,
    };
    newData[data] = value;
    setProductForm(newData);
  }

  function imagesChangeHandler(e) {
    const data = e.target.name.substring(5);
    const value = e.target.value;
    const newData = [...images];
    newData[data].imgUrl = value;
    setImages(newData);
  }

  function deleteHandler(e, imageIndex) {
    e.preventDefault();
    const newData = [...images];
    newData.splice(imageIndex, 1);
    setImages(newData);
  }

  function submitHandler(e) {
    e.preventDefault();

    const error = [];
    if (!productForm.name) {
      error.push("Product name is required");
    }
    if (!productForm.overview) {
      error.push("Product overview is required");
    }
    if (!productForm.description) {
      error.push("Product description is required");
    }
    if (productForm.price === "") {
      error.push("Product price is required");
    } else if (+productForm.price < 0) {
      error.push("Minimum product price is 0");
    }
    if (!productForm.mainImg) {
      error.push("Main image is required");
    }
    if (productForm.categoryId === "") {
      error.push("Product category is required");
    }

    if (error.length) {
      const message = error.join(", ");
      return swal("Error", message, "error");
    }

    const filteredImages = images.filter((image) => image.imgUrl);

    const productInput = {
      ...productForm,
      Images: filteredImages,
    };

    if (formType === "add") {
      dispatch(createProduct(productInput));
    } else if (formType === "edit") {
      dispatch(updateProduct(productInput, product.id));
    }
    navigate("/products");
  }

  return (
    <div className="bg-white">
      <div className="py-2 px-30 my-8">
        <form
          action=""
          className="space-y-6 w-1/3 mx-auto"
          onSubmit={submitHandler}
        >
          <h1 className="text-2xl font-semibold">
            {formType === "add" ? "Create Product" : "Edit Product"}
          </h1>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                autoFocus
                onChange={productChangeHandler}
                value={productForm.name}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="overview"
              className="text-sm font-medium text-gray-700"
            >
              Overview <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="overview"
                name="overview"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={productChangeHandler}
                value={productForm.overview}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={productChangeHandler}
                value={productForm.description}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Price <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="number"
                id="price"
                name="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={productChangeHandler}
                value={productForm.price}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="text-sm font-medium text-slate-700"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <select
                name="categoryId"
                id="categoryId"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={productChangeHandler}
                value={productForm.categoryId}
              >
                <option value="" disabled>
                  Choose Category
                </option>
                {categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="mainImg"
              className="text-sm font-medium text-gray-700"
            >
              Main Image <span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="mainImg"
                name="mainImg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                onChange={productChangeHandler}
                value={productForm.mainImg}
              />
            </div>
          </div>

          {images?.map((image, index) => {
            return (
              <div key={index}>
                <label
                  htmlFor={`image`}
                  className="text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <div className="mt-2 flex gap-2">
                  <button
                    className="w-1/6 justify-center px-1 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-700"
                    onClick={(e) => deleteHandler(e, index)}
                  >
                    Delete
                  </button>
                  <input
                    type="text"
                    id={`image${index}`}
                    name={`image${index}`}
                    className="w-5/6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-smalt focus:border-smalt"
                    onChange={imagesChangeHandler}
                    value={image?.imgUrl}
                  />
                </div>
              </div>
            );
          })}

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-smalt hover:bg-darkSmalt focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkSmalt"
            >
              Submit
            </button>
            <button
              className="w-full justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium text-cola bg-tangerine hover:bg-darkTangerine focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkTangerine"
              onClick={addImages}
            >
              Add More Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
