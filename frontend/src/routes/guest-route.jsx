import { Outlet } from "react-router-dom"
import GuestMiddleware from "../middlewares/GuestMiddleware"
import Login from "../pages/Login"
import Register from "../pages/Register"

const guestRoute = {
  path: "/auth",
  element: (
    <GuestMiddleware>
      <Outlet />
    </GuestMiddleware>
  ),
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
}

export default guestRoute
