import { createBrowserRouter, RouterProvider } from "react-router-dom"
import useMessage from "./hooks/useMessage"
import { ToastContainer } from "react-toastify"
import guestRoute from "./routes/guest-route"
import privateRoute from "./routes/private-route"
import publiRoute from "./routes/public-route"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUser } from "./store/thunk/auth-thunk"

function App() {
  const router = createBrowserRouter([guestRoute, privateRoute, publiRoute])
  const { isChecked } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useMessage()

  useEffect(() => {
    if (!isChecked) {
      dispatch(getUser())
    }
  }, [isChecked, dispatch])

  if (!isChecked) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-xl text-slate-700 font-semibold">Loading</h1>
      </div>
    )
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
