import { createBrowserRouter, RouterProvider } from "react-router-dom"
import useMessage from "./hooks/useMessage"
import { ToastContainer } from "react-toastify"
import guestRoute from "./routes/guest-route"
import privateRoute from "./routes/private-route"
import publiRoute from "./routes/public-route"

function App() {
  const router = createBrowserRouter([guestRoute, privateRoute, publiRoute])

  useMessage()

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
