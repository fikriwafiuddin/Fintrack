import { Link, Outlet, useLocation } from "react-router-dom"
import { LuLayoutDashboard } from "react-icons/lu"
import {
  FaUserCircle,
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaChartBar,
} from "react-icons/fa"
import { HiBars3, HiXMark } from "react-icons/hi2"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/thunk/auth-thunk"

const links = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: <LuLayoutDashboard size={20} />,
  },
  {
    label: "Income",
    url: "/income",
    icon: <FaArrowAltCircleUp size={20} />,
  },
  {
    label: "Expenses",
    url: "/expenses",
    icon: <FaArrowAltCircleDown size={20} />,
  },
  // {
  //   label: "Budgeting",
  //   url: "/budgeting",
  //   icon: <FaArrowAltCircleDown size={20} />,
  // },
  {
    label: "Analytics",
    url: "/analytics",
    icon: <FaChartBar size={20} />,
  },
  {
    label: "Profile",
    url: "/profile",
    icon: <FaUserCircle size={20} />,
  },
]

function MainLayout() {
  const [openSidebar, setOpenSidebar] = useState(false)
  const { isLoading } = useSelector((state) => state.auth)
  const location = useLocation()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <aside
        className={`${
          openSidebar ? "flex" : "hidden md:flex"
        } flex-col justify-between bg-slate-50 border-r-2 border-slate-200 text-slate-700 p-4 fixed top-0 left-0 w-64 h-full`}
      >
        <button
          type="button"
          className="absolute top-2 right-2 md:hidden"
          onClick={() => setOpenSidebar(false)}
          aria-label="Close Sidebar"
        >
          <HiXMark size={20} />
        </button>
        <div className="">
          <h1 className="text-center text-2xl font-bold">Fintrack</h1>
          <nav>
            <ul className="mt-8 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.url}
                    className={`${
                      location.pathname === link.url
                        ? "bg-slate-200"
                        : " hover:bg-slate-200"
                    } px-4 py-2 rounded-lg flex items-center gap-4`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="text-sm space-y-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-red-200 w-full py-2 rounded"
          >
            {isLoading ? "Loading" : "Logout"}
          </button>
          <p>v0.0.0</p>
        </div>
      </aside>
      {/* <Header /> */}
      <div className="md:ml-64 h-screen overflow-y-auto">
        <header className="border-b-2 border-slate-200 text-slate-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpenSidebar(!openSidebar)}
              className="md:hidden"
              aria-label="Toggle Sidebar"
            >
              <HiBars3 size={20} />
            </button>
            <h2 className="font-semibold">Welcome Back, Fikri 🙌</h2>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </header>
        <main className="p-4">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
