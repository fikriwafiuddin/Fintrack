import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, Lightbulb, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAskAI, useGetChat } from "@/services/hooks/chatHook"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import chatValidation from "@/lib/validations/chat-validation"
import type { FormDataAskAI } from "@/types"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useEffect, useRef } from "react"
import ChatMessage from "@/components/ChatMessage"
import ChatMessageSkeleton from "@/components/ChatMessageSkeleton"

const AskAIPage = () => {
  const form = useForm({
    resolver: zodResolver(chatValidation.askAI),
    defaultValues: {
      message: "",
    },
  })
  const {
    isPending: isLoadingChat,
    isError: isErrorChat,
    error: errorChat,
    data: chat,
  } = useGetChat()
  const { isPending: sending, mutate: send } = useAskAI()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const messageValue = form.watch("message")

  useEffect(() => {
    if (chat?.messages?.length) {
      scrollToBottom()
    }
  }, [chat])

  useEffect(() => {
    if (chat?.messages?.length) {
      scrollToBottom()
    }
  }, [chat?.messages, sending])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const onSubmit = (data: FormDataAskAI) => {
    send(data, {
      onSuccess: () => form.reset(),
    })
  }

  if (isErrorChat) {
    const errorMessage =
      errorChat instanceof Error ? errorChat.message : "Unknown error."

    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Failed to Load Chat</AlertTitle>
        <AlertDescription>
          An error occurred while retrieving the chat list. Please try reloading
          the page.
          <p className="mt-1 text-xs opacity-80">{errorMessage}</p>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Ask AI</h1>
            <p className="text-sm text-muted-foreground">
              Your personal financial assistant
            </p>
          </div>
        </div>

        {/* Tips Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Tips
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>💡 Usage Tips</DialogTitle>
              <DialogDescription>
                <ul className="text-sm space-y-2 mt-4">
                  <li>• Ask about your transaction summary</li>
                  <li>• Ask for advice on managing your budget</li>
                  <li>• Ask for tips on saving and managing your finances</li>
                  <li>• Request an analysis of your spending patterns</li>
                </ul>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoadingChat ? (
          <>
            <ChatMessageSkeleton />
            <ChatMessageSkeleton role="user" />
          </>
        ) : chat.messages.length === 0 ? (
          <ChatMessage
            message={{
              _id: "1",
              role: "model",
              content:
                "Hi! I'm an AI assistant to help you manage your finances. You can ask me about transactions, budgets, or financial tips",
              timestamp: new Date().toLocaleString(),
            }}
          />
        ) : (
          chat.messages.map((message) => (
            <ChatMessage key={message._id} message={message} />
          ))
        )}
        {sending && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <Bot className="h-4 w-4 text-foreground" />
            </div>
            <div className="flex-1">
              <div className="inline-block p-3 rounded-lg bg-accent">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-2 bg-background">
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Textarea
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              form.handleSubmit(onSubmit)()
                            }
                          }}
                          placeholder="Ask anything"
                          className="min-h-[60px] max-h-[200px] resize-none"
                          disabled={sending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={sending || !messageValue}
                  size="icon"
                  className="h-[60px] w-12 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}

export default AskAIPage
