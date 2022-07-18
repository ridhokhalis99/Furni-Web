import { deleteCategory } from "../store/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function CategoryRow(props) {
  const dispatch = useDispatch();
  const { category, index } = props;
  function deleteHandler(e, categoryId) {
    e.preventDefault();
    dispatch(deleteCategory(categoryId));
  }
  return (
    <tr className="border-b even:bg-gray-50">
      <td className="px-6 py-4 text-center">
        <div className="text-sm leading-5 text-gray-500">{index}</div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="text-sm leading-5 text-gray-500">{category.name}</div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="text-sm leading-5 text-gray-500">
          <Link
            to={`${category.id}/edit`}
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Edit
          </Link>
          <button
            className="ml-3 font-semibold text-rose-600 hover:text-rose-700"
            onClick={(e) => deleteHandler(e, category.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CategoryRow;
