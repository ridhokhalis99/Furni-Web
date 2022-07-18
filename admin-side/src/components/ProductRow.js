import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";
import rupiahFormat from "../helpers/rupiahFormat";
import { deleteProduct } from "../store/actions";

function ProductRow(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, index } = props;
  const [modalIsOpen, setIsOpen] = useState(false);

  function deleteHandler(e, productId) {
    e.preventDefault();
    dispatch(deleteProduct(productId));
    navigate("/products");
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <Modal className="" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="grid grid-cols-2">
          <div className="flex items-center">
            <img className="mx-auto" src={product.mainImg} alt="" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.Images?.map((image, index) => {
              return <img src={image.imgUrl} alt="" key={index} />;
            })}
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="px-3 text-sm font-normal text-center py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
      <tr className="border-b odd:bg-white even:bg-gray-50">
        <td className="px-6 py-4 text-center">
          <div className="text-sm leading-5 text-gray-500">{index}</div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="text-sm leading-5 text-gray-500">{product.name}</div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="text-sm leading-5 text-gray-500">
            {product.Category.name}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="text-sm leading-5 text-gray-500">
            {product.overview}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="text-sm leading-5 text-gray-500">
            {rupiahFormat(product.price)}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="text-sm leading-5 text-gray-500">
            <button
              className="px-3 text-sm font-normal text-center py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white"
              onClick={openModal}
            >
              View
            </button>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="text-sm leading-5 text-gray-500">
            {product.User.username ? product.User.username : product.User.email}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="text-sm leading-5 text-gray-500">
            <Link
              to={`${product.id}/edit`}
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Edit
            </Link>
            <button
              className="ml-3 font-semibold text-rose-600 hover:text-rose-700"
              onClick={(e) => deleteHandler(e, product.id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ProductRow;
