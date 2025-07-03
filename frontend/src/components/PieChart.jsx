import { Pie } from "react-chartjs-2"
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
)

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

function PieChart({ pieData }) {
  return <Pie data={pieData} options={pieOptions} />
}

export default PieChart
