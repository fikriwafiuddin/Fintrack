import { Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { HiBanknotes } from "react-icons/hi2"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { useSelector } from "react-redux"
import { formatCurrency } from "../utils/formatters"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
)

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Pemasukan",
      data: [4000, 3000, 5000, 4500],
      backgroundColor: "#4ade80",
    },
    {
      label: "Pengeluaran",
      data: [2400, 1398, 2800, 2600],
      backgroundColor: "#f87171",
    },
  ],
}

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
}

const pieData = {
  labels: ["Hiburan", "Transportasi", "Makanan", "Lainnya"],
  datasets: [
    {
      label: "Pengeluaran",
      data: [400, 300, 300, 200],
      backgroundColor: ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"],
      borderWidth: 1,
    },
  ],
}

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      color: "#000",
      formatter: (value, context) => {
        const total = context.chart._metasets[0].total
        const percentage = ((value / total) * 100).toFixed(1) + "%"
        return percentage
      },
      font: {
        weight: "bold",
      },
    },
  },
}

function Dashboard() {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {/* Balance - sudah ada ikon */}
        <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
          <div className="rounded-full bg-blue-100 text-blue-700 p-2">
            <HiBanknotes size={24} />
          </div>
          <div className="">
            <h2 className="text-xl font-semibold text-slate-700">Ballance</h2>
            <p className="text-slate-600">{formatCurrency(user.balance)}</p>
          </div>
        </div>

        {/* Spending Today - tambah ikon */}
        <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
          <div className="rounded-full bg-red-100 text-red-700 p-2">
            <FaArrowDown size={24} />
          </div>
          <div className="">
            <h2 className="text-xl font-semibold text-slate-700">Expense</h2>
            <p className="text-slate-600">
              {formatCurrency(user.totalExpense)}
            </p>
          </div>
        </div>

        {/* Income Today - tambah ikon */}
        <div className="bg-white shadow-xl p-4 rounded-xl flex items-center gap-4">
          <div className="rounded-full bg-green-100 text-green-700 p-2">
            <FaArrowUp size={24} />
          </div>
          <div className="">
            <h2 className="text-xl font-semibold text-slate-700">Income</h2>
            <p className="text-slate-600">{formatCurrency(user.totalIncome)}</p>
          </div>
        </div>
      </div>

      {/* charts */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="md:col-span-2 bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">
            Pemasukan vs Pengeluaran
          </h2>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Pie Chart */}
        <div className="col-span-1 bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Persentase Pengeluaran</h2>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
