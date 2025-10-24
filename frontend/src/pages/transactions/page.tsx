import { Button } from "@/components/ui/button"
import type { TransactionFilter } from "@/types"
import {
  ArrowUpDownIcon,
  CalendarIcon,
  FilterIcon,
  PlusIcon,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetAllTransactions } from "@/services/hooks/transactionHook"
import { useGetAllCategories } from "@/services/hooks/categoryHook"
import TransactionCard from "@/components/TransactionCard"
import TransactionRowSkeleton from "@/components/TransactionRowSkeleton"
import { Label } from "@/components/ui/label"
import DatePicker from "@/components/DatePicker"
import AppPagination from "@/components/AppPagination"

const CategoryItemSkeleton = () =>
  [...Array(6)].map((_, index) => (
    <div
      key={index}
      className="flex items-center space-x-2 p-2 mx-1 my-1 h-8 rounded-sm animate-pulse"
    >
      <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
      <div className="h-3 w-20 bg-muted-foreground/30 rounded" />
    </div>
  ))

function TransactionsPage() {
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))
  )
  const [filter, setFilter] = useState<TransactionFilter>({
    sort: "asc",
  } as TransactionFilter)
  const [page, setPage] = useState<number>(1)
  const { data: transactionData, isPending: isTransactionsLoading } =
    useGetAllTransactions({ ...filter, startDate, endDate, page })
  const { data: categoryData, isPending: isCategoriesLoading } =
    useGetAllCategories()

  const transactions = transactionData?.transactions || []
  const allCategories = [
    ...(categoryData?.defaultCategories || []),
    ...(categoryData?.customCategories || []),
  ]

  const handleFilterChange = (key: keyof TransactionFilter, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }))
    setPage(1)
  }

  const handleSortOrder = (value: "asc" | "desc") => {
    setFilter((prev) => ({
      ...prev,
      sort: value,
    }))
    setPage(1)
  }

  const handleStartDate = (date: Date) => {
    setStartDate(date)
    setPage(1)
  }

  const handleEndDate = (date: Date) => {
    setEndDate(date)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Transaction History
          </h1>
          <p className="text-muted-foreground">
            Manage and view all your financial transactions
          </p>
        </div>
        <Link to="/add-transaction">
          <Button size="lg" className="w-full sm:w-auto">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            {/* Filter & Search */}
            Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            {/* <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for transactions..."
                value={filter.searchTerm || ""}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
                className="pl-10"
              />
            </div> */}

            {/* Type Filter */}
            <Select
              value={filter.type || "all"}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={filter.category || "all"}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Category</SelectItem>
                {isCategoriesLoading ? (
                  <CategoryItemSkeleton />
                ) : (
                  allCategories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Button
              variant="outline"
              onClick={() =>
                handleSortOrder(filter.sort === "asc" ? "desc" : "asc")
              }
              className="justify-start"
            >
              <ArrowUpDownIcon className="mr-2 h-4 w-4" />
              {filter.sort === "desc" ? "Latest" : "Oldest"}
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-md">
            <div className="flex flex-col sm:flex-row gap-2">
              <Label>From</Label>
              <div className="flex-1">
                <DatePicker value={startDate} onChange={handleStartDate} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Label>To</Label>
              <div className="flex-1">
                <DatePicker value={endDate} onChange={handleEndDate} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction List ({transactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isTransactionsLoading && (
            <div className="space-y-2">
              <TransactionRowSkeleton />
              <TransactionRowSkeleton />
              <TransactionRowSkeleton />
            </div>
          )}
          {!isTransactionsLoading && transactions.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {Object.keys(filter).some(
                  (key) => filter[key as keyof TransactionFilter]
                )
                  ? "No transactions match the filter"
                  : "There are no transactions yet"}
              </p>
              <Link to="/add-transaction" className="inline-block mt-4">
                <Button>Add Transaction</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <TransactionCard transaction={transaction} />
              ))}
            </div>
          )}

          <div className="mt-4">
            <AppPagination
              currentPage={page}
              onPageChange={setPage}
              totalPages={transactionData?.pagination?.totalPages || 0}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage
