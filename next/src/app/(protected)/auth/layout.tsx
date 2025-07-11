"use client"

import { useUserFromCache } from "@/lib/hooks/useAuth"
import { redirect } from "next/navigation"

function AuthLoyout({ children }: { children: React.ReactNode }) {
  const user = useUserFromCache()
  console.log(user)
  if (user) {
    return redirect("/dashboard")
  }

  return <div>{children}</div>
}

export default AuthLoyout
