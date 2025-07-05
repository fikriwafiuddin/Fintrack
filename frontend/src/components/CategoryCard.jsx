import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { deleteCategory } from "../store/thunk/category-thunk"

function CategoryCard({ category, handleSelect, setOpenForm }) {
  const { isLoadingDelete } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  const handleUpdate = () => {
    setOpenForm(true)
    handleSelect(category)
  }

  const handleDelete = () => {
    dispatch(deleteCategory(category._id))
  }

  return (
    <div
      key={category._id}
      className="relative bg-slate-50 shadow rounded-lg p-4 m-2 flex items-center gap-2"
    >
      <div className="">{category.icon}</div>
      <h4>{category.name}</h4>
      <div className="absolute bottom-1 right-2">
        <button
          onClick={handleUpdate}
          type="button"
          className="bg-blue-100 text-blue-500 rounded p-1 hover:bg-blue-100"
        >
          <FaEdit size={14} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoadingDelete}
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
