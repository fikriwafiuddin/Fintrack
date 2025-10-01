import { z } from "zod"

const add = z.object({
  name: z
    .string("Name must be a string")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .trim(),
  color: z
    .string("Color must be a string")
    .length(7, "Color must be 7 characters")
    .trim(),
  type: z.enum(["expense", "income", "both"], "Type is required"),
})

const categoryValidation = {
  add,
}
export default categoryValidation
