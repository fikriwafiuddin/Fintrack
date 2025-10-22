import type { Message } from "@/types"
import { BotIcon, UserIcon } from "lucide-react"

type ChatMessageProps = {
  message: Message
}

function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      key={message._id}
      className={`flex gap-3 ${
        message.role === "user" ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === "user" ? "bg-primary" : "bg-accent"
        }`}
      >
        {message.role === "user" ? (
          <UserIcon className="h-4 w-4 text-primary-foreground" />
        ) : (
          <BotIcon className="h-4 w-4 text-foreground" />
        )}
      </div>
      <div
        className={`flex-1 max-w-[80%] ${
          message.role === "user" ? "text-right" : ""
        }`}
      >
        <div
          className={`inline-block p-3 rounded-lg ${
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-foreground"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(message.timestamp).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}

export default ChatMessage
