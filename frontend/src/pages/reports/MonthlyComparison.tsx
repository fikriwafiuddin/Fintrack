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
import { BarChart3Icon, AlertTriangleIcon } from "lucide-react"
import { useGetLast6MonthsSummary } from "@/services/hooks/reportHook"

// --- Komponen Skeleton untuk Chart ---
const MonthlyComparisonSkeleton = () => (
  <div className="flex flex-col space-y-4 p-6 animate-pulse">
    {/* Skeleton X-Axis (Bulan) */}
    <div className="flex justify-between mt-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-3 w-10 bg-muted rounded-full" />
      ))}
    </div>
    {/* Skeleton Bar Chart Area */}
    <div className="h-48 w-full bg-muted rounded-lg" />
    {/* Skeleton Legend */}
    <div className="flex justify-center space-x-8 pt-2">
      <div className="h-3 w-16 bg-muted rounded-full" />
      <div className="h-3 w-16 bg-muted rounded-full" />
    </div>
  </div>
)

// --- Komponen Error State ---
const ChartErrorState = () => (
  <div className="flex flex-col items-center justify-center h-[300px] text-center p-6 text-muted-foreground">
    <AlertTriangleIcon className="h-10 w-10 text-destructive mb-4" />
    <p className="font-semibold text-lg text-foreground">
      Failed to Load Report Data
    </p>
    <p className="text-sm">
      An error occurred while retrieving the 6-month summary data. Please try
      again later.
    </p>
  </div>
)

function MonthlyComparison() {
  const { data, isPending, isError } = useGetLast6MonthsSummary()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3Icon className="h-5 w-5" />
          Trends of the Last 6 Months
        </CardTitle>
      </CardHeader>

      <CardContent className="boz-">
        {/* 🛑 HANDLE LOADING STATE */}
        {isPending && !data ? (
          <MonthlyComparisonSkeleton />
        ) : /* 🛑 HANDLE ERROR STATE */
        isError ? (
          <ChartErrorState />
        ) : /* 🛑 RENDER CHART (PASTIKAN DATA TIDAK KOSONG) */
        data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="income" fill="#10b981" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          /* 🛑 HANDLE EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-[300px] text-center p-6 text-muted-foreground">
            <p className="text-lg">No data available for the last 6 months.</p>
            <p className="text-sm">
              Start recording transactions to view your trends.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MonthlyComparison
