"use client"

import { useUserFromCache } from "@/lib/hooks/useAuth"
import React from "react"

function AuthLoyout({ children }: { children: React.ReactNode }) {
  console.log("AuthLayout")

  const user = useUserFromCache()
  console.log(user)
  return <div>{children}</div>
}

export default AuthLoyout
