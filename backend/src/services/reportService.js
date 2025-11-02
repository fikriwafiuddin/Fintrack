import { z } from "zod"
import validation from "../validations/validation.js"
import CategorySummary from "../models/categorySummaryModel.js"
import Transaction from "../models/transactionModel.js"
import MonthlySummary from "../models/monthlySummaryModel.js"

const getSummaryValidation = z.object({
  month: z
    .preprocess(
      (val) => Number(val),
      z
        .number({
          invalid_type_error: "Month must be a number",
          required_error: "Month is required",
        })
        .int()
        .min(0, "Month must be between 0 and 11")
        .max(11, "Month must be between 0 and 11")
    )
    .default(new Date().getMonth()),
  year: z
    .preprocess(
      (val) => Number(val),
      z.number({
        invalid_type_error: "Year must be a number",
        required_error: "Year is required",
      })
    )
    .default(new Date().getFullYear()),
})

const getSummary = async (request, user) => {
  const { month, year } = validation(getSummaryValidation, request)

  const categorySummary = await CategorySummary.find({
    month,
    year,
    user,
  }).populate({
    path: "categories.category",
    select: "name icon color",
    options: { includeDeleted: true },
  })

  const expenseSummary = categorySummary.find((val) => val.type === "expense")
  const incomeSummary = categorySummary.find((val) => val.type === "income")

  const expenseCategoryBreakdown = expenseSummary?.categories.map(
    (element, index, arr) => {
      return (arr[index] = {
        _id: element.category._id,
        name: element.category.name,
        color: element.category.color,
        amount: element.amount,
        percentage: (element.amount / expenseSummary.totalAmount) * 100,
      })
    }
  )
  const incomeCategoryBreakdown = incomeSummary?.categories.map(
    (element, index, arr) => {
      return (arr[index] = {
        _id: element.category._id,
        name: element.category.name,
        color: element.category.color,
        amount: element.amount,
        percentage: (element.amount / incomeSummary.totalAmount) * 100,
      })
    }
  )

  const startDate = new Date(year, Number(month), 1)
  const endDate = new Date(year, Number(month) + 1, 1)

  const totalTransactions = await Transaction.countDocuments({
    date: { $gte: startDate, $lt: endDate },
    user,
  })

  return {
    totalIncome: incomeSummary?.totalAmount || 0,
    totalExpense: expenseSummary?.totalAmount || 0,
    difference:
      (incomeSummary?.totalAmount || 0) - (expenseSummary?.totalAmount || 0),
    totalTransactions,
    expenseCategoryBreakdown: expenseCategoryBreakdown || [],
    incomeCategoryBreakdown: incomeCategoryBreakdown || [],
  }
}

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

const getLast6MonthsSummary = async (user) => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const last6Months = []
  for (let i = 0; i < 6; i++) {
    const date = new Date(currentYear, currentMonth - i, 1)
    last6Months.push({
      month: date.getMonth(),
      year: date.getFullYear(),
    })
  }

  const summaries = await MonthlySummary.find({
    user,
    $or: last6Months.map(({ month, year }) => ({ month, year })),
  })

  const monthlyComparisonData = last6Months.map(({ month, year }) => {
    const found = summaries.find((s) => s.month === month && s.year === year)

    return {
      month: `${monthNames[month]} ${year}`,
      income: found ? found.totalIncome : 0,
      expense: found ? found.totalExpense : 0,
    }
  })

  monthlyComparisonData.sort((a, b) => {
    const [monthA, yearA] = a.month.split(" ")
    const [monthB, yearB] = b.month.split(" ")
    return new Date(`${monthB} 1, ${yearB}`) - new Date(`${monthA} 1, ${yearA}`)
  })

  return monthlyComparisonData
}

const reportSevice = {
  getSummary,
  getLast6MonthsSummary,
}
export default reportSevice
