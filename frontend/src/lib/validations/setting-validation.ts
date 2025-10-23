import { z } from "zod"

const enumCurrency = ["IDR", "USD", "EUR", "GBP", "JPY", "SGD", "MYR", "THB"]

const update = z.object({
  currency: z.enum(enumCurrency, {
    error: "Currency is not valid",
  }),
})

const settingValidation = {
  update,
}
export default settingValidation
