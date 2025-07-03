import { FaArrowDown } from "react-icons/fa"
import PieChart from "../components/PieChart"
import BarChart from "../components/BarChart"
import { useState } from "react"
import ToggleTab from "../components/ToggleTab"
import Table from "../components/Table"
import { useSelector } from "react-redux"
import CategoryCard from "../components/CategoryCard"
import { configTableExpeses, tabsExpenses } from "../config/expenses-config"

function Expenses() {
  const [tab, setTab] = useState("category")
  const { transactions, categories, barData, pieData } = useSelector(
    (state) => state.expenses
  )
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
          <div className="rounded-full bg-red-100 text-red-700 p-2">
            <FaArrowDown size={24} />
          </div>
          <div className="">
            <h2 className="text-xl font-semibold text-slate-700">
              Total Expenses This Month
            </h2>
            <p className="text-slate-600">Rp 200.000</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">
            Expenses Chart This Month
          </h2>
          <BarChart barData={barData} />
        </div>
        <div className="col-span-1 bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-4 text-slate-700">
            Percentage of expense this month
          </h2>
          <PieChart pieData={pieData} />
        </div>
      </div>

      <ToggleTab tabs={tabsExpenses} setTab={setTab} tab={tab} />

      <div className="mt-4 mb-24 text-slate-700 min-h-[500px]">
        {tab === "category" && (
          <>
            <div className="">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                // onClick={() => setOpenForm(true)}
              >
                + Add Category
              </button>
            </div>
            <div className="bg-white shadow rounded-xl mt-4 p-4">
              <h3 className="text-lg font-medium">List Category</h3>
              <div className="grid md:grid-cols-3">
                {categories.map((category) => (
                  <CategoryCard category={category} key={category.id} />
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "transactions" && (
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
            <Table config={configTableExpeses} data={transactions} />
          </div>
        )}
      </div>
    </>
  )
}

export default Expenses
