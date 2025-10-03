import MainLayout from "@/layouts/MainLayout"
import AddTransactionPage from "@/pages/add-transaction/page"
import CategoriesPage from "@/pages/categories/page"
import DashboardPage from "@/pages/dashboard/page"
import LandingPage from "@/pages/landing/page"
import ReportsPage from "@/pages/reports/page"
import TransactionsPage from "@/pages/transactions/page"
import { createBrowserRouter } from "react-router"

const protectedRoutes = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    Component: MainLayout,
    children: [
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "add-transaction",
        Component: AddTransactionPage,
      },
      {
        path: "transactions",
        Component: TransactionsPage,
      },
      {
        path: "reports",
        Component: ReportsPage,
      },
      {
        path: "categories",
        Component: CategoriesPage,
      },
    ],
  },
])

export default protectedRoutes
