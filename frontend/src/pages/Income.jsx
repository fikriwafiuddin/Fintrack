import { useEffect, useState } from "react"
import BarChart from "../components/BarChart"
import PieChart from "../components/PieChart"
import { FaArrowUp } from "react-icons/fa"
import CategoryCard from "../components/CategoryCard"
import Table from "../components/Table"
import { useDispatch, useSelector } from "react-redux"
import { configTableIncome, tabs } from "../config/income-config"
import ToggleTab from "../components/ToggleTab"
import FormCategory from "../components/FormCategory"
import { getCategories } from "../store/thunk/category-thunk"

function Income() {
  const [openForm, setOpenForm] = useState(false)
  const [openFormCategory, setOpenFormCategory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [tab, setTab] = useState("category")
  const { transactions, barData, pieData } = useSelector(
    (state) => state.income
  )
  const { categories, isLoadingGet } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories("income"))
  }, [dispatch])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
          <div className="rounded-full bg-green-100 text-green-700 p-2">
            <FaArrowUp size={24} />
          </div>
          <div className="">
            <h2 className="text-xl font-semibold text-slate-700">
              Total Income This Month
            </h2>
            <p className="text-slate-600">Rp 200.000</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">
            Income Chart This Month
          </h2>
          <BarChart barData={barData} />
        </div>
        <div className="col-span-1 bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-4 text-slate-700">
            Percentage of income this month
          </h2>
          <PieChart pieData={pieData} />
        </div>
      </div>

      <ToggleTab tab={tab} setTab={setTab} tabs={tabs} />

      <div className="mt-4 mb-24 text-slate-700 min-h-[500px]">
        {tab === "category" ? (
          <>
            <div className="">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                onClick={() => setOpenFormCategory(true)}
              >
                + Add Category
              </button>
            </div>
            <div className="bg-white shadow rounded-xl mt-4 p-4">
              <h3 className="text-lg font-medium">List Category</h3>
              {isLoadingGet && (
                <h4 className="text-center text-xl text-slate-700 font-semibold mt-4">
                  Loading
                </h4>
              )}
              {!isLoadingGet && categories.length === 0 && (
                <h4 className="text-center text-xl text-slate-700 font-semibold mt-4">
                  No Category Found
                </h4>
              )}
              <div className="grid md:grid-cols-3">
                {categories.map((category) => (
                  <CategoryCard
                    category={category}
                    key={category._id}
                    setOpenForm={setOpenFormCategory}
                    handleSelect={setSelectedCategory}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                onClick={() => setOpenForm(true)}
              >
                + Add Transaction
              </button>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Type
                </label>
                <select
                  name="type"
                  id=""
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                >
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Time
                </label>
                <select
                  name=""
                  id=""
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
                >
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>
            </div>

            <div className="bg-white shadow rounded-xl mt-4 p-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    List Transactions
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                        />
                      </svg>
                      Export
                    </button>
                  </div>
                </div>
              </div>
              <Table config={configTableIncome} data={transactions} />
            </div>
          </>
        )}
      </div>

      <div
        className={`fixed ${
          !openForm && "hidden"
        }  inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-50`}
      >
        <div className="relative top-20 mx-auto p-5 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
          <div className="flex justify-between items-center pb-3">
            <h3 className="text-lg font-bold text-gray-900">Add Transaction</h3>
            <button
              onClick={() => setOpenForm(false)}
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

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Choose Category</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Amount
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="category_id"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Choose Type</option>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dadte"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                name="note"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setOpenForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Simpan Barang
              </button>
            </div>
          </form>
        </div>
      </div>

      <FormCategory
        openFormCategory={openFormCategory}
        setOpenFormCategory={setOpenFormCategory}
        type="income"
        category={selectedCategory}
      />
    </>
  )
}

export default Income
