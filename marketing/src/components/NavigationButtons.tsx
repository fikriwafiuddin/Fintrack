"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRightIcon } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { MAIN_APP_URL } from "@/constants"

function NavigationButtons() {
  const { userId } = useAuth()

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button asChild size="lg">
        <Link href={userId ? `${MAIN_APP_URL}/dashboard` : "/auth/sign-in"}>
          {userId ? "Go to Dashboard" : "Start Now"}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          document.getElementById("features")?.scrollIntoView({
            behavior: "smooth",
          })
        }}
      >
        Learn More
      </Button>
    </div>
  )
}

export default NavigationButtons
