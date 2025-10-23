import { z } from "zod"

const enumCurrency = ["IDR", "USD", "EUR", "GBP", "JPY", "SGD", "MYR", "THB"]

const update = z.object({
  currency: z.enum(enumCurrency, {
    required_error: "Currency is required",
    invalid_type_error: "Invalid currency",
  }),
})

const settingValidation = {
  update,
}
export default settingValidation
