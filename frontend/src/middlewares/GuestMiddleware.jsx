import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function GuestMiddleware({ children }) {
  const { user } = useSelector((state) => state.auth)

  if (user) {
    return <Navigate to="/dashboard" replace={true} />
  } else {
    return children
  }
}

export default GuestMiddleware
