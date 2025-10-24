import AuthPage from "@/pages/auth/page"
import NotFound from "@/pages/error/NotFound"
import LandingPage from "@/pages/landing/page"
import { createBrowserRouter } from "react-router"

const publicRoutes = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  { path: "/sign-in", Component: AuthPage },
  {
    path: "*",
    Component: NotFound,
  },
])

export default publicRoutes
