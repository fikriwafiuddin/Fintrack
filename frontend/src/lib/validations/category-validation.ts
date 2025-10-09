import { z } from "zod"

const add = z.object({
  name: z
    .string({ error: "Name must be a string" })
    .trim()
    .min(3, { error: "Name must be at least 3 characters" })
    .max(50, { error: "Name must be at most 50 characters" })
    .regex(/^[a-zA-Z0-9\s\-_]+$/, {
      error:
        "Name can only contain letters, numbers, spaces, hyphens, and underscores",
    }),

  color: z
    .string({ error: "Color must be a string" })
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}$/, {
      error: "Color must be a valid hex color (e.g., #FF5733)",
    })
    .toLowerCase()
    .transform((val) => val.toUpperCase()),

  type: z.enum(["expense", "income", "both"], {
    error: "Type must be one of: expense, income, both",
  }),
})

const categoryValidation = {
  add,
}
export default categoryValidation
