import { DownloadIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import CategoryBreakDown from "./CategoryBreakDown"
import MonthlyComparison from "./MonthlyComparison"
import SummaryCard from "./SummaryCard"
import ReportDateControls from "./ReportDateControls"

const summaryData = {
  month: 0,
  year: 2024,
  totalIncome: 5000000,
  totalExpense: 3000000,
  balance: 2000000,
  transactions: 20,
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

const expenseBreakdown = [
  {
    categoryId: 1,
    categoryName: "Makanan",
    color: "#FF6B6B",
    amount: 80000,
    percentage: 20.51,
  },
  {
    categoryId: 2,
    categoryName: "Transportasi",
    color: "#4ECDC4",
    amount: 45000,
    percentage: 11.54,
  },
  {
    categoryId: 3,
    categoryName: "Hiburan",
    color: "#FFD93D",
    amount: 100000,
    percentage: 25.64,
  },
  {
    categoryId: 4,
    categoryName: "Tagihan",
    color: "#1A535C",
    amount: 150000,
    percentage: 38.31,
  },
]

const incomeBreakdown = [
  {
    categoryId: 1,
    categoryName: "Makanan",
    color: "#FF6B6B",
    amount: 80000,
    percentage: 20.51,
  },
  {
    categoryId: 2,
    categoryName: "Transportasi",
    color: "#4ECDC4",
    amount: 45000,
    percentage: 11.54,
  },
  {
    categoryId: 3,
    categoryName: "Hiburan",
    color: "#FFD93D",
    amount: 100000,
    percentage: 25.64,
  },
  {
    categoryId: 4,
    categoryName: "Tagihan",
    color: "#1A535C",
    amount: 150000,
    percentage: 38.31,
  },
]

function ReportsPage() {
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())

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
      <SummaryCard summaryData={summaryData} />

      {/* Monthly Comparison Chart */}
      <MonthlyComparison />

      {/* Category Breakdown */}
      <CategoryBreakDown
        month={monthNames[selectedMonth]}
        year={selectedYear}
        incomeBreakdown={incomeBreakdown}
        expenseBreakdown={expenseBreakdown}
      />
    </div>
  )
}

export default ReportsPage
