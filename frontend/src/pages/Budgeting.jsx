import BudgetCard from "../components/BudgetCard"

export default function Budgeting() {
  const budgets = [
    { category: "food", limit: 1500000, used: 1000000 },
    { category: "transport", limit: 800000, used: 600000 },
    { category: "entertainment", limit: 500000, used: 550000 },
    { category: "utilities", limit: 700000, used: 300000 },
  ]

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0)
  const totalUsed = budgets.reduce((sum, b) => sum + b.used, 0)
  const totalPercent = (totalUsed / totalLimit) * 100

  return (
    <>
      <div className="space-y-6">
        {/* Ringkasan Total */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-gray-700">
              Total Budget Usage
            </span>
            <span className="text-sm text-gray-600">
              Rp {totalUsed.toLocaleString()} / {totalLimit.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="h-4 bg-green-500 rounded-full"
              style={{ width: `${totalPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {totalPercent.toFixed(0)}% used
          </p>
        </div>

        {/* Daftar Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget, i) => (
            <BudgetCard key={i} {...budget} />
          ))}
        </div>
      </div>
    </>
  )
}
