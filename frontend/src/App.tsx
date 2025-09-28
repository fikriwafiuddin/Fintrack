import { createBrowserRouter, RouterProvider } from "react-router"
import LandingPage from "./pages/landing/page"
import MainLayout from "./layouts/MainLayout"
import DashboardPage from "./pages/dashboard/page"
import AddTransactionPage from "./pages/add-transaction/page"

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
