import "dotenv/config"
import connectDB from "../utils/connectDB.js"
import Category from "../models/categoryModel.js"

connectDB()

const categories = [
  {
    name: "Food",
    color: "#ff6b6b",
    type: "expense",
    isDefault: true,
  },
  {
    name: "Transportation",
    color: "#4ecdc4",
    type: "expense",
    isDefault: true,
  },
  {
    name: "Bills",
    color: "#45b7d1",
    type: "expense",
    isDefault: true,
  },
  {
    name: "Entertainment",
    color: "#f9ca24",
    type: "both",
    isDefault: true,
  },
  {
    name: "Salary",
    color: "#6c5ce7",
    type: "income",
    isDefault: true,
  },
  {
    name: "Investments",
    color: "#a29bfe",
    type: "income",
    isDefault: true,
  },
]

const seedCategories = async () => {
  try {
    await Category.insertMany(categories)
    console.log("Categories seeded successfully")
    process.exit()
  } catch (error) {
    console.error("Error seeding categories:", error)
    process.exit(1)
  }
}

seedCategories()
