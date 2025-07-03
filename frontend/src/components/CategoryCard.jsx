import { FaEdit, FaTrashAlt } from "react-icons/fa"

function CategoryCard({ category }) {
  return (
    <div
      key={category.id}
      className="relative bg-slate-50 shadow rounded-lg p-4 m-2 flex items-center gap-2"
    >
      <div className="">{category.icon}</div>
      <h4>{category.name}</h4>
      <div className="absolute bottom-1 right-2">
        <button
          type="button"
          className="bg-blue-100 text-blue-500 rounded p-1 hover:bg-blue-100"
        >
          <FaEdit size={14} />
        </button>
        <button
          type="button"
          className="ml-2 bg-red-100 text-red-500 rounded p-1 hover:bg-red-100"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    </div>
  )
}

export default CategoryCard
