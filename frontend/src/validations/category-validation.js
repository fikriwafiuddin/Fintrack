import { z } from "zod"

const create = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  icon: z.string(),
})

export default {
  create,
}
