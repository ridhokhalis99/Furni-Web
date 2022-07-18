import { Link } from "react-router-dom";
import rupiahFormat from "../helpers/rupiahFormat";

function ProductCard(props) {
  const { product } = props;
  return (
    <div className="shadow-md rounded-lg">
      <img src={product.mainImg} alt="" className="my-6" />
      <div className="px-6 pb-4">
        <Link
          to={`${product.id}`}
          className="font-bold text-xl tracking-normal hover:underline"
        >
          {product.name}
        </Link>
        <p className="mt-2">{product.overview}</p>
        <p className="mt-2 font-bold text-xl tracking-tighter">
          <span className="mr-1 text-xs align-top">Rp</span>
          {rupiahFormat(product.price)}
        </p>
        <button
          type="button"
          className="my-4 items-center px-4 py-1 w-full border border-transparent text-sm font-medium rounded-md shadow-sm text-cola bg-tangerine hover:bg-darkTangerine"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
