import mongoose from "mongoose"
import statisticValidation from "../validations/statistic-validation.js"
import validation from "../validations/validation.js"
import Transaction from "../models/transaction-model.js"

const statisticPerMonth = async (request, userId) => {
  const { type, year, month } = validation(
    statisticValidation.statisticPerMonth,
    request
  )

  const startDate = new Date(year, Number(month), 1)
  const endDate = new Date(year, Number(month) + 1, 0, 23, 59, 59, 999)

  const transactions = await Transaction.find({
    user: new mongoose.Types.ObjectId(userId),
    type,
    date: { $gte: startDate, $lte: endDate },
  }).populate("category", "name")

  // Hitung total amount
  const totalAmount = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  )

  // ===================== BAR DATA (Per Minggu) =====================
  const weeklyTotals = [0, 0, 0, 0]

  transactions.forEach((tx) => {
    const day = tx.date.getDate()
    const weekIndex = day <= 7 ? 0 : day <= 14 ? 1 : day <= 21 ? 2 : 3
    weeklyTotals[weekIndex] += tx.amount
  })

  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: type === "income" ? "Income" : "Expenses",
        data: weeklyTotals,
        backgroundColor:
          type === "income"
            ? "rgba(75, 192, 192, 0.5)"
            : "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  // ===================== PIE DATA (Per Kategori) =====================
  const categoryMap = {}

  transactions.forEach((tx) => {
    const categoryName = tx.category?.name || "Lainnya"
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = 0
    }
    categoryMap[categoryName] += tx.amount
  })

  const pieLabels = Object.keys(categoryMap)
  const pieValues = Object.values(categoryMap)
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#a4de6c",
    "#d0ed57",
    "#8dd1e1",
  ]

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        label: type === "income" ? "Income" : "Expenses",
        data: pieValues,
        backgroundColor: colors.slice(0, pieLabels.length),
        borderWidth: 1,
      },
    ],
  }
  return { totalAmount, barData, pieData }
}

export default {
  statisticPerMonth,
}
