import { createBrowserRouter, RouterProvider } from "react-router"
import LandingPage from "./pages/landing/page"
import MainLayout from "./layouts/MainLayout"
import DashboardPage from "./pages/dashboard/page"
import AddTransactionPage from "./pages/add-transaction/page"
import TransactionsPage from "./pages/transactions/page"
import ReportsPage from "./pages/reports/page"

const router = createBrowserRouter([
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
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
