// src/components/BudgetCard.jsx

export default function BudgetCard({ category, limit, used, onEdit }) {
  const percentUsed = Math.min((used / limit) * 100, 100)

  return (
    <div className="bg-slate-50 shadow-md p-4 rounded-2xl">
      <div className="flex items-center gap-2 mb-2">
        <div className="">💻</div>
        <h3 className="font-semibold capitalize">{category}</h3>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className={`h-3 ${percentUsed < 80 ? "bg-blue-500" : "bg-red-500"}`}
          style={{ width: `${percentUsed}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Rp {used.toLocaleString()} / {limit.toLocaleString()}
        </span>
        <p className="text-sm mt-2 text-gray-600">
          {percentUsed.toFixed(0)}% used
        </p>
      </div>
      <button
        onClick={onEdit}
        className="text-sm text-blue-600 hover:underline mt-2"
      >
        Edit
      </button>
    </div>
  )
}
