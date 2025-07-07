import { useDispatch, useSelector } from "react-redux"
import { setMonth, setYear } from "../store/slice/globalSlice"

export default function MonthlyReportFilter() {
  const { selectedMonth, selectedYear } = useSelector((state) => state.global)
  const dispatch = useDispatch()

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  const years = []
  for (let y = 2024; y <= currentYear; y++) {
    years.push(y)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const months = monthNames.map((name, index) => ({
    name,
    value: index,
  }))

  const availableMonths =
    selectedYear === currentYear ? months.slice(0, currentMonth + 1) : months

  const handleYearChange = (e) => {
    const year = Number(e.target.value)
    dispatch(setYear(year))
  }

  const handleMonthChange = (e) => {
    const month = Number(e.target.value)
    dispatch(setMonth(month))
  }

  return (
    <div className="flex gap-4 mt-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year
        </label>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Month
        </label>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500"
        >
          {availableMonths.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
