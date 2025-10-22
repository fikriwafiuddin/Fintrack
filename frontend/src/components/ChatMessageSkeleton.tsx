import { BotIcon, UserIcon } from "lucide-react"

type ChatMessageSkeletonProps = {
  role?: "user" | "model"
}

/**
 * Skeleton loader for the ChatMessage component.
 * It simulates the layout of a user or model message during the loading state.
 */
function ChatMessageSkeleton({ role = "model" }: ChatMessageSkeletonProps) {
  const isUser = role === "user"
  const flexDirectionClass = isUser ? "flex-row-reverse" : ""
  const avatarBgClass = isUser ? "bg-primary/50" : "bg-accent/50"
  const bubbleAlignmentClass = isUser ? "text-right" : ""
  const bubbleBgClass = isUser ? "bg-primary/50" : "bg-accent/50"
  const bubbleShapeClass = isUser
    ? "h-4 w-40 sm:w-64" // Short line for user
    : "h-4 w-60 sm:w-80" // Long line for model

  const animatePulseClass = "animate-pulse"

  return (
    <div className={`flex gap-3 ${flexDirectionClass} ${animatePulseClass}`}>
      {/* Skeleton Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${avatarBgClass}`}
      >
        {isUser ? (
          <UserIcon className="h-4 w-4 text-primary-foreground/50" />
        ) : (
          <BotIcon className="h-4 w-4 text-foreground/50" />
        )}
      </div>

      <div className={`flex-1 max-w-[80%] ${bubbleAlignmentClass}`}>
        <div className={`inline-block p-3 rounded-lg ${bubbleBgClass}`}>
          <div
            className={`${bubbleShapeClass} rounded-md bg-current/20 mb-1`}
          ></div>
          <div className="h-4 w-3/4 rounded-md bg-current/20"></div>
        </div>

        {/* Skeleton Timestamp */}
        <p className="text-xs mt-1">
          <span className="inline-block h-2 w-12 rounded-md bg-muted-foreground/50"></span>
        </p>
      </div>
    </div>
  )
}

export default ChatMessageSkeleton
