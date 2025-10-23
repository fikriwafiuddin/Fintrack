import { formatCurrencyValue } from "@/lib/utils"
import { useUserPreference } from "@/store/useUserPreference"
import { useMemo } from "react"

type CurrencyFormatterProps = {
  amount: number
}

function CurrencyFormatter({ amount }: CurrencyFormatterProps) {
  const currencyCode = useUserPreference((state) => state.currencyCode)
  console.log(currencyCode)
  const formattedValue = useMemo(() => {
    return formatCurrencyValue(amount, currencyCode)
  }, [amount, currencyCode])

  return formattedValue
}

export default CurrencyFormatter
