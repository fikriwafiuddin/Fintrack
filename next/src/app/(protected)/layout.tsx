"use client"

import Provider from "@/components/Provider"

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <div>{children}</div>
    </Provider>
  )
}

export default ProtectedLayout
