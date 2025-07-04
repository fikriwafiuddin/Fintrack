import categoryValidation from "../validations/category-validation.js"
import validation from "../validations/validation.js"

const all = async (request) => {
  const { userId, type } = validation(categoryValidation.allValidation, request)

  const categories = await Category.find({ user: userId, type }).sort({
    createdAt: -1,
  })
  return categories
}

export default {
  all,
}
