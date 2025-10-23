import type { TooltipProps } from "recharts"
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"
import CurrencyFormatter from "./CurrencyFormatter"

type CustomTooltipProps = TooltipProps<ValueType, NameType>

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
        <p className="font-semibold leading-none tracking-tight mb-1">
          {label}
        </p>

        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>

            <p className="text-muted-foreground">
              {entry.name}:{" "}
              <span className="font-medium text-popover-foreground">
                <CurrencyFormatter
                  amount={typeof entry?.value === "number" ? entry.value : 0}
                />
              </span>
            </p>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default CustomTooltip
