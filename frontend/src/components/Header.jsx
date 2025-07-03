import { Link, useLocation } from "react-router-dom"

const links = [
  {
    label: "Dashboard",
    url: "/dashboard",
  },
  {
    label: "Transactions",
    url: "/transactions",
  },
  {
    label: "Budgeting",
    url: "/budgeting",
  },
  {
    label: "Profile",
    url: "/profile",
  },
]

function Header() {
  const location = useLocation()
  console.log(location)
  return (
    <header className="bg-slate-700 text-white p-4">
      <h1 className="text-center text-2xl font-bold">Finance App</h1>
      <nav>
        <ul className="flex justify-center gap-8 text-sm font-semibold mt-4">
          {links.map((link) => (
            <li key={link.label}>
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
