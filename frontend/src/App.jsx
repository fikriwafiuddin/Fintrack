import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import MainLayout from "./layouts/MainLayout"
import Income from "./pages/Income"
import Budgeting from "./pages/Budgeting"
import Profile from "./pages/Profile"
import Expenses from "./pages/Expenses"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import useMessage from "./hooks/useMessage"
import { ToastContainer } from "react-toastify"

function App() {
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/income"
            element={
              <MainLayout>
                <Income />
              </MainLayout>
            }
          />
          <Route
            path="/expenses"
            element={
              <MainLayout>
                <Expenses />
              </MainLayout>
            }
          />
          {/* <Route
            path="/budgeting"
            element={
              <MainLayout>
                <Budgeting />
              </MainLayout>
            }
          /> */}
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
