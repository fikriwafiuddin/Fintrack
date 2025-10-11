import { AlertTriangleIcon, DownloadIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import CategoryBreakDown, {
  CategoryBreakDownError,
  CategoryBreakDownSkeleton,
} from "./CategoryBreakDown"
import MonthlyComparison from "./MonthlyComparison"
import SummaryCard from "./SummaryCard"
import ReportDateControls from "./ReportDateControls"
import { useGetSummary } from "@/services/hooks/reportHook"
import StatCardSkeleton from "@/components/StatCardSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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

function ReportsPage() {
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const { data, isPending, isError, error } = useGetSummary({
    month: selectedMonth,
    year: selectedYear,
  })

  const handleExport = () => {
    console.log("export")
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Financial Statements
          </h1>
          <p className="text-muted-foreground">
            Manage and view all your financial transactions
          </p>
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Quick Shortcuts */}
          <ReportDateControls
            currentDate={currentDate}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            monthNames={monthNames}
          />

          {/* Export Button */}
          <Button variant="outline" onClick={handleExport}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Ekspor
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {isPending && !data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      ) : isError ? (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Failed to Load Data</AlertTitle>
          <AlertDescription>
            An error occurred while retrieving today's summary. Please try
            again.
            <p className="mt-1 text-xs opacity-80">
              {error instanceof Error ? error.message : "Unknown error."}
            </p>
          </AlertDescription>
        </Alert>
      ) : (
        data && <SummaryCard summaryData={data} />
      )}

      {/* Monthly Comparison Chart */}
      <MonthlyComparison />

      {/* Category Breakdown */}
      {isPending && !data ? (
        <CategoryBreakDownSkeleton />
      ) : isError ? (
        <CategoryBreakDownError />
      ) : (
        data && (
          <CategoryBreakDown
            month={monthNames[selectedMonth]}
            year={selectedYear}
            incomeBreakdown={data.incomeCategoryBreakdown || []}
            expenseBreakdown={data.expenseCategoryBreakdown || []}
          />
        )
      )}
    </div>
  )
}

export default ReportsPage
