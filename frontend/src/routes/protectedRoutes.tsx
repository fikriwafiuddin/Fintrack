import MainLayout from "@/layouts/MainLayout"
import AddTransactionPage from "@/pages/add-transaction/page"
import AskAIPage from "@/pages/ask-AI/page"
import BudgetsPage from "@/pages/budgets/page"
import CategoriesPage from "@/pages/categories/page"
import DashboardPage from "@/pages/dashboard/page"
import NotFound from "@/pages/error/NotFound"
import LandingPage from "@/pages/landing/page"
import ReportsPage from "@/pages/reports/page"
import SettingsPage from "@/pages/settings/page"
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
        path: "budgets",
        Component: BudgetsPage,
      },
      {
        path: "reports",
        Component: ReportsPage,
      },
      {
        path: "categories",
        Component: CategoriesPage,
      },
      {
        path: "ask-ai",
        Component: AskAIPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
])

export default protectedRoutes
