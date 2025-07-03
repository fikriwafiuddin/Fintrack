import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import MainLayout from "./layouts/MainLayout"
import Income from "./pages/Income"
import Budgeting from "./pages/Budgeting"
import Profile from "./pages/Profile"
import Expenses from "./pages/Expenses"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
