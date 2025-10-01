import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"
import CustomTooltip from "@/components/CustomTooltip"
import { BarChart3Icon } from "lucide-react"

const monthlyComparisonData = [
  { month: "September 2025", income: 12000, expense: 8300 },
  { month: "Agustus 2025", income: 11500, expense: 7600 },
  { month: "Juli 2025", income: 11000, expense: 7200 },
  { month: "Juni 2025", income: 10500, expense: 6900 },
  { month: "Mei 2025", income: 9800, expense: 6400 },
  { month: "April 2025", income: 9500, expense: 6000 },
]

function MonthlyComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3Icon className="h-5 w-5" />
          Trends of the Last 6 Months
        </CardTitle>
      </CardHeader>
      <CardContent className="boz-">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyComparisonData}>
            <XAxis dataKey="month" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" />
            <Bar dataKey="expense" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default MonthlyComparison
