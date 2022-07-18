import CategoryRow from "./CategoryRow";

function CategoryTable(props) {
  const { categories } = props;
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            No
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            Name
          </th>
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-gray-300 bg-gray-50">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => {
          return (
            <CategoryRow
              category={category}
              index={index + 1}
              key={category.id}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default CategoryTable;
