import MainLayout from "../layouts/MainLayout"
import PrivateMiddleware from "../middlewares/PrivateMiddleware"
import Dashboard from "../pages/Dashboard"
import Income from "../pages/Income"
import Expenses from "../pages/Expenses"
import Profile from "../pages/Profile"

const privateRoute = {
  path: "/",
  element: (
    <PrivateMiddleware>
      <MainLayout />
    </PrivateMiddleware>
  ),
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "income",
      element: <Income />,
    },
    {
      path: "expenses",
      element: <Expenses />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
  ],
}

export default privateRoute
