import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
}

function BarChart({ barData }) {
  return <Bar data={barData} options={barOptions} />
}

export default BarChart
