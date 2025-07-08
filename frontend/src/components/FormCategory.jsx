import { zodResolver } from "@hookform/resolvers/zod"
import categoryValidation from "../validations/category-validation"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { createCategory, updateCategory } from "../store/thunk/category-thunk"
import { useEffect, useState } from "react"
import EmojiPicker from "emoji-picker-react"

function FormCategory({
  openFormCategory,
  setOpenFormCategory,
  type = "income",
  category = null,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(categoryValidation.create),
    mode: "onSubmit",
    values: {
      icon: category?.icon || "🍔",
      name: category?.name || "",
    },
  })
  const { isLoadingPost, message, isLoadingPut } = useSelector(
    (state) => state.category
  )
  const [showPicker, setShowPicker] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    if (category) {
      dispatch(updateCategory({ data, id: category?._id }))
        .unwrap()
        .catch((backendErrors) => {
          for (const key in backendErrors?.errors) {
            setError(key, { message: backendErrors.errors[key][0] })
          }
        })
    } else {
      dispatch(createCategory({ ...data, type }))
        .unwrap()
        .catch((backendErrors) => {
          for (const key in backendErrors?.errors) {
            setError(key, { message: backendErrors.errors[key][0] })
          }
        })
    }
  }

  const handleEmojiClick = (emojiData) => {
    setValue("icon", emojiData.emoji, { shouldValidate: true }) // update form value & trigger validation
    setShowPicker(false)
  }

  useEffect(() => {
    if (message.success) {
      setOpenFormCategory(false)
    }
  }, [message.success, setOpenFormCategory])

  return (
    <div
      className={`fixed ${
        !openFormCategory && "hidden"
      }  inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-50`}
    >
      <div className="relative top-20 mx-auto p-5 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-lg font-bold text-gray-900">
            {category ? "Edit Category" : "Add Category"}
          </h3>
          <button
            disabled={isLoadingPost}
            onClick={() => setOpenFormCategory(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="icon"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Icon
              </label>
              <input
                {...register("icon")}
                id="icon"
                name="icon"
                readOnly
                onClick={() => setShowPicker(true)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className={`${
                  showPicker ? "" : "hidden"
                } fixed inset-0 flex justify-center items-center`}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
              {errors.icon && (
                <p className="text-sm text-red-600">{errors.icon.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                name="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              disabled={isLoadingPost}
              type="button"
              onClick={() => setOpenFormCategory(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Batal
            </button>
            <button
              disabled={isLoadingPost || isLoadingPut}
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoadingPost || isLoadingPut ? "Loading" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormCategory
