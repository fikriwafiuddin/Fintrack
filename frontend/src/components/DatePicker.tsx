import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { useState } from "react"

type DatePickerProps = {
  onChange: (date: Date) => void
  value: Date
}

function DatePicker({ onChange, value }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "dd MMMM yyyy") : <span>Choose date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (!date) return
            onChange(date)
            setIsOpen(false)
          }}
          defaultMonth={value}
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
