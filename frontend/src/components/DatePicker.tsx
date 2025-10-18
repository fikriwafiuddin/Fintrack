import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { FormControl } from "./ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import type { ControllerRenderProps } from "react-hook-form"
import { useState } from "react"

type DatePickerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>
}

function DatePicker({ field }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "dd MMMM yyyy")
            ) : (
              <span>Choose date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={(date) => {
            field.onChange(date)
            setIsOpen(false)
          }}
          defaultMonth={field.value}
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
