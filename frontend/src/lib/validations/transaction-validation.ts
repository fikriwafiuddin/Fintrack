import { z } from "zod"

const add = z.object({
  type: z.enum(["expense", "income"], "Type is required"),
  amount: z
    .string()
    .min(1, "Jumlah harus diisi")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Jumlah harus berupa angka positif"
    ),
  category: z.string("Category is required"),
  date: z.date("Date is required"),
  notes: z.string().optional(),
})

const transactionValidation = {
  add,
}
export default transactionValidation
