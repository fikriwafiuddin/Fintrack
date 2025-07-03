export const transactions = [
  {
    id: 1,
    category: { id: 1, name: "Freelance", icon: "💻" },
    amount: 500000,
    date: "2023-10-01",
    note: "Project A",
  },
  {
    id: 2,
    category: { id: 2, name: "Game", icon: "🎮" },
    amount: 200000,
    date: "2023-10-02",
    note: "Game Sale",
  },
]

export const barData = {
  labels: ["week 1", "week 2", "week 3", "week 4"],
  datasets: [
    {
      label: "Income",
      data: [100000, 150000, 200000, 250000],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
}

export const pieData = {
  labels: ["Hiburan", "Transportasi", "Makanan", "Lainnya"],
  datasets: [
    {
      label: "Expenses",
      data: [400, 300, 300, 200],
      backgroundColor: ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"],
      borderWidth: 1,
    },
  ],
}

export const categories = [
  { id: 1, name: "Freelance", icon: "💻" },
  { id: 2, name: "Game", icon: "🎮" },
  { id: 3, name: "Food", icon: "🍔" },
]
