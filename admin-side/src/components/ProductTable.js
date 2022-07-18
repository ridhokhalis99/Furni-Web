import ProductRow from "./ProductRow";

function ProductTable(props) {
  const { products } = props;
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            No
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            Product
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            Category
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            overview
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            Price
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            Images
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            Added By
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
          return (
            <ProductRow product={product} index={index + 1} key={product.id} />
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;
