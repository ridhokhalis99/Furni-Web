import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../store/actions";
import CategoryTable from "../components/CategoryTable";
import PulseLoader from "react-spinners/PulseLoader";

function CategoriesPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const categories = useSelector((state) => {
    return state.category.categories;
  });

  useEffect(() => {
    dispatch(fetchCategories());
    setLoading(true);
  }, [dispatch]);

  useEffect(() => {
    if (categories.length) {
      setLoading(false);
    }
  }, [categories]);

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
            Add Category
          </Link>
          <div className="w-full align-middle border-gray-300 shadow rounded-lg">
            <CategoryTable categories={categories} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default CategoriesPage;
