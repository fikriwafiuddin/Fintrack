import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <SignUp />
    </div>
  )
}
