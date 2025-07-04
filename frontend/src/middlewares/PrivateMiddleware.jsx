import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateMiddleware({ children }) {
  const { user } = useSelector((state) => state.auth)

  if (user) {
    return children
  } else {
    return <Navigate to="/auth/login" replace={true} />
  }
}

export default PrivateMiddleware
