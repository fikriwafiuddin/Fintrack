import { formatCurrencyValue } from "@/lib/utils"
import { useUserPreference } from "@/store/useUserPreference"

type CurrencyFormatterProps = {
  amount: number
}

function CurrencyFormatter({ amount }: CurrencyFormatterProps) {
  const currencyCode = useUserPreference((state) => state.currencyCode)
  return formatCurrencyValue(amount, currencyCode)
}

export default CurrencyFormatter
