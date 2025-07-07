import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import {
  createTransaction,
  updateTransaction,
} from "../store/thunk/transactio-thunk"
import transactionValidation from "../validations/transaction-validation"
import { useEffect } from "react"
import { stringToDate } from "../utils/formatters"

function FormTransaction({
  openForm,
  setOpenForm,
  type = "income",
  transaction,
  setTransaction,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(transactionValidation.create),
    mode: "onSubmit",
    values: {
      category: transaction?.category._id || "",
      amount: transaction?.amount || "",
      date: stringToDate(transaction?.date) || "",
      note: transaction?.note || "",
    },
  })
  const { isLoadingPost, message, isLoadingPut } = useSelector(
    (state) => state.transaction
  )
  const { categories } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    if (transaction) {
      dispatch(updateTransaction({ id: transaction._id, data }))
        .unwrap()
        .catch((backendErrors) => {
          for (const key in backendErrors?.errors) {
            setError(key, { message: backendErrors.errors[key][0] })
          }
        })
    } else {
      dispatch(createTransaction({ ...data, type }))
        .unwrap()
        .catch((backendErrors) => {
          for (const key in backendErrors?.errors) {
            setError(key, { message: backendErrors.errors[key][0] })
          }
        })
    }
  }

  useEffect(() => {
    if (message.success) {
      setOpenForm(false)
      setTransaction(null)
    }
  }, [message.success, setOpenForm, setTransaction])

  return (
    <div
      className={`fixed ${
        !openForm && "hidden"
      }  inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-50`}
    >
      <div className="relative top-20 mx-auto p-5 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-lg font-bold text-gray-900">
            {transaction ? "Edit" : "Add"} Transaction
          </h3>
          <button
            onClick={() => {
              setOpenForm(false)
              setTransaction(null)
            }}
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
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                {...register("category")}
                id="category"
                name="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <input
                {...register("amount")}
                id="amount"
                name="amount"
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
              {errors.amount && (
                <p className="text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="dadte"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                {...register("date")}
                id="date"
                name="date"
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <textarea
              {...register("note")}
              name="note"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.note && (
              <p className="text-sm text-red-600">{errors.note.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              disabled={isLoadingPost || isLoadingPut}
              type="button"
              onClick={() => {
                setOpenForm(false)
                setTransaction(null)
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              disabled={isLoadingPost || isLoadingPut}
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoadingPost || isLoadingPut ? "Loading" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormTransaction
