import { createBrowserRouter, RouterProvider } from "react-router"
import LandingPage from "./pages/landing/page"
import MainLayout from "./layouts/MainLayout"
import DashboardPage from "./pages/dashboard/page"

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
