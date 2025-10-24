import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { ClerkProvider } from "@clerk/clerk-react"
import { Toaster } from "sonner"
import { ErrorBoundary } from "./components/ErrorBoundary.tsx"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
        <Toaster position="top-center" />
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
)
