"use client"

import Provider from "@/components/Provider"
import { ToastContainer } from "react-toastify"

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
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
      <div>{children}</div>
    </Provider>
  )
}

export default ProtectedLayout
