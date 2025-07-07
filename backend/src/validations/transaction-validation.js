import { z } from "zod"

const create = z.object({
  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Category must be a string",
  }),
  amount: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
  ),
  type: z.enum(["income", "expense"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'income' or 'expense'",
  }),
  date: z
    .string() // Pertama, Zod melihatnya sebagai string dari input
    .transform((str, ctx) => {
      // Coba untuk mengkonversi string menjadi objek Date
      const date = new Date(str)

      // Periksa apakah konversi berhasil dan menghasilkan tanggal yang valid
      if (isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid date and time format",
        })
        return z.NEVER // Memberi sinyal Zod bahwa transformasi gagal
      }
      return date // Mengembalikan objek Date yang valid
    })
    .pipe(z.date()),
  note: z
    .string()
    .max(255, "Note must be less then 3 characters long")
    .optional(),
})

const all = z.enum(["income", "expense"], {
  required_error: "Type is required",
  invalid_type_error: "Type must be either 'income' or 'expense'",
})

const remove = z
  .string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string",
  })
  .length(24, "ID must be exactly 24 characters long")

const update = z.object({
  id: z
    .string({
      required_error: "Transaction id is required",
      invalid_type_error: "Transaction id must be a string",
    })
    .length(24, "ID must be exactly 24 characters long"),
  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Category must be a string",
  }),
  amount: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
  ),
  date: z
    .string() // Pertama, Zod melihatnya sebagai string dari input
    .transform((str, ctx) => {
      // Coba untuk mengkonversi string menjadi objek Date
      const date = new Date(str)

      // Periksa apakah konversi berhasil dan menghasilkan tanggal yang valid
      if (isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid date and time format",
        })
        return z.NEVER // Memberi sinyal Zod bahwa transformasi gagal
      }
      return date // Mengembalikan objek Date yang valid
    })
    .pipe(z.date()),
  note: z
    .string()
    .max(255, "Note must be less then 3 characters long")
    .optional(),
})

export default {
  create,
  all,
  remove,
  update,
}
