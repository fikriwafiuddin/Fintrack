import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type ReportDateControlsProps = {
  currentDate: Date
  selectedMonth: number
  setSelectedMonth: (month: number) => void
  selectedYear: number
  setSelectedYear: (year: number) => void
  monthNames: string[]
}

const isSameMonth = (
  month1: number,
  year1: number,
  month2: number,
  year2: number
) => {
  return month1 === month2 && year1 === year2
}

const getPreviousMonth = (month: number, year: number) => {
  if (month === 0) return { month: 11, year: year - 1 }
  return { month: month - 1, year }
}

const getNextMonth = (month: number, year: number) => {
  if (month === 11) return { month: 0, year: year + 1 }
  return { month: month + 1, year }
}

function ReportDateControls({
  currentDate,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  monthNames,
}: ReportDateControlsProps) {
  const isCurrentMonth = isSameMonth(
    selectedMonth,
    selectedYear,
    currentDate.getMonth(),
    currentDate.getFullYear()
  )

  const lastMonthDate = getPreviousMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  )
  const isLastMonth = isSameMonth(
    selectedMonth,
    selectedYear,
    lastMonthDate.month,
    lastMonthDate.year
  )

  const handleSetCurrentMonth = () => {
    setSelectedMonth(currentDate.getMonth())
    setSelectedYear(currentDate.getFullYear())
  }

  const handleSetLastMonth = () => {
    setSelectedMonth(lastMonthDate.month)
    setSelectedYear(lastMonthDate.year)
  }

  const handlePreviousMonth = () => {
    const prev = getPreviousMonth(selectedMonth, selectedYear)
    setSelectedMonth(prev.month)
    setSelectedYear(prev.year)
  }

  const handleNextMonth = () => {
    const next = getNextMonth(selectedMonth, selectedYear)
    const nextDate = new Date(next.year, next.month)
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth())

    if (nextDate <= today) {
      setSelectedMonth(next.month)
      setSelectedYear(next.year)
    }
  }

  const minYear = 2020
  const maxYear = currentDate.getFullYear()

  const canGoPrevious = !(selectedYear === minYear && selectedMonth === 0)
  const canGoNext =
    selectedYear < currentDate.getFullYear() ||
    (selectedYear === currentDate.getFullYear() &&
      selectedMonth < currentDate.getMonth())
  return (
    <>
      <div className="flex gap-2">
        <Button
          variant={isCurrentMonth ? "default" : "outline"}
          size="sm"
          onClick={handleSetCurrentMonth}
        >
          This Month
        </Button>
        <Button
          variant={isLastMonth ? "default" : "outline"}
          size="sm"
          onClick={handleSetLastMonth}
        >
          Last Month
        </Button>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-8 bg-gray-300" />

      {/* Date Navigation */}
      <div className="flex items-center gap-2">
        {/* Previous Month Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          disabled={!canGoPrevious}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        {/* Month Selector */}
        <Select
          value={selectedMonth.toString()}
          onValueChange={(value) => setSelectedMonth(parseInt(value))}
        >
          <SelectTrigger className="w-32">
            <span className="text-sm">{monthNames[selectedMonth]}</span>
          </SelectTrigger>
          <SelectContent>
            {monthNames.map((name, i) => (
              <SelectItem key={i} value={i.toString()}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Selector */}
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(parseInt(value))}
        >
          <SelectTrigger className="w-24">
            <span className="text-sm">{selectedYear}</span>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
              const year = maxYear - i
              return (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>

        {/* Next Month Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          disabled={!canGoNext}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-8 bg-gray-300" />
    </>
  )
}

export default ReportDateControls
