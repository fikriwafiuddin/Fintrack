import { useState } from "react"
import ToggleTab from "../components/ToggleTab"
import { useEffect } from "react"
import { statisticPerMonth } from "../store/thunk/statistic-thunk"
import { useDispatch, useSelector } from "react-redux"
import BarChart from "../components/BarChart"
import PieChart from "../components/PieChart"
import MonthlyReportFilter from "../components/MonthlyReportFilter"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { formatCurrency } from "../utils/formatters"

const tabs = ["income", "expense"]

function Analytics() {
  const [tab, setTab] = useState("income")
  const { selectedMonth, selectedYear } = useSelector((state) => state.global)
  const { barData, pieData, isLoading, totalAmount } = useSelector(
    (state) => state.statistic
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const type = tab
    dispatch(
      statisticPerMonth({
        type,
        year: selectedYear,
        month: selectedMonth,
      })
    )
  }, [dispatch, tab, selectedYear, selectedMonth])

  return (
    <>
      <ToggleTab tabs={tabs} tab={tab} setTab={setTab} />

      <MonthlyReportFilter />

      <div className="mt-4">
        {tab === "income" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
              <div className="rounded-full bg-green-100 text-green-700 p-2">
                <FaArrowUp size={24} />
              </div>
              <div className="">
                <h2 className="text-xl font-semibold text-slate-700">
                  Total Income
                </h2>
                <p className="text-slate-600">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
              <div className="rounded-full bg-red-100 text-red-700 p-2">
                <FaArrowDown size={24} />
              </div>
              <div className="">
                <h2 className="text-xl font-semibold text-slate-700">
                  Total Expenses
                </h2>
                <p className="text-slate-600">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2 bg-white shadow rounded-xl p-4 min-h-80">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">
            Income Chart This Month
          </h2>
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-xl font-semibold text-slate-700">Loading</p>
            </div>
          ) : (
            <BarChart barData={barData} />
          )}
        </div>
        <div className="col-span-1 bg-white shadow rounded-xl p-4 min-h-80">
          <h2 className="font-semibold mb-4 text-slate-700">
            Percentage of income this month
          </h2>
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-xl font-semibold text-slate-700">Loading</p>
            </div>
          ) : (
            <PieChart pieData={pieData} />
          )}
        </div>
      </div>
    </>
  )
}

export default Analytics
