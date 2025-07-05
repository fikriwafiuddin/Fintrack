import { z } from "zod"

const all = z.object({
  type: z.enum(["income", "expense"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'income' or 'expense'",
  }),
})

const create = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name must be at least 1 character long"),
  icon: z.string({
    required_error: "Icon is required",
    invalid_type_error: "Icon must be a string",
  }),
  // .min(1, "Icon must be at least 1 character long")
  // .max(1, "Icon must be at most 1 characters long"),
  type: z.enum(["income", "expense"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'income' or 'expense'",
  }),
  userId: z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .length(24, "User ID must be exactly 24 characters long"),
})

const update = z.object({
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .length(24, "ID must be exactly 24 characters long"),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name must be at least 1 character long"),
  icon: z.string({
    required_error: "Icon is required",
    invalid_type_error: "Icon must be a string",
  }),
})

const remove = z
  .string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string",
  })
  .length(24, "ID must be exactly 24 characters long")

export default {
  all,
  create,
  update,
  remove,
}
