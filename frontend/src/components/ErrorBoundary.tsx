import React, { type ErrorInfo } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { APP_DEBUG } from "@/lib/constants"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ error: error, errorInfo: errorInfo })
    // Kirim log ke monitoring service (Sentry, LogRocket, dll)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      console.log(APP_DEBUG)
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <Card className="max-w-md w-full shadow-lg">
            <CardHeader className="flex items-center justify-center flex-col">
              <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
              <CardTitle className="text-xl text-center">
                Something Went Wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                An unexpected error occurred while loading content.
              </p>
              <Button onClick={this.handleReload}>Refresh Page</Button>

              {APP_DEBUG && (
                <details className="whitespace-pre-wrap text-left text-xs text-red-500 mt-4">
                  <summary className="cursor-pointer font-bold text-sm text-red-600 dark:text-red-400">
                    View Debug Details
                  </summary>

                  <div className="pt-2 space-y-2">
                    {/* NAMA ERROR */}
                    <div className="border-b border-red-500/20 pb-1">
                      <p className="font-bold text-red-700 dark:text-red-300">
                        ERROR NAME:
                      </p>
                      <p className="text-foreground/80">
                        {this.state.error?.name || "N/A"}
                      </p>
                    </div>

                    {/* MESSAGE ERROR */}
                    <div className="border-b border-red-500/20 pb-1">
                      <p className="font-bold text-red-700 dark:text-red-300">
                        MESSAGE:
                      </p>
                      <p className="text-foreground/80">
                        {this.state.error?.message ||
                          "No specific message provided."}
                      </p>
                    </div>

                    {/* COMPONENT STACK (Error Info) */}
                    {this.state.errorInfo?.componentStack && (
                      <div className="border-b border-red-500/20 pb-1">
                        <p className="font-bold text-red-700 dark:text-red-300">
                          COMPONENT STACK (React):
                        </p>
                        <pre className="text-xs overflow-x-auto text-foreground/80">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}

                    {/* JAVASCRIPT STACK (Trace) */}
                    {this.state.error?.stack && (
                      <div>
                        <p className="font-bold text-red-700 dark:text-red-300">
                          JAVASCRIPT STACK TRACE:
                        </p>
                        <pre className="text-xs overflow-x-auto text-foreground/80">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
