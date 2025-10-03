import AuthPage from "@/pages/auth/page"
import LandingPage from "@/pages/landing/page"
import { createBrowserRouter } from "react-router"

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  { path: "/sign-in", Component: AuthPage },
])

export default publicRoutes
