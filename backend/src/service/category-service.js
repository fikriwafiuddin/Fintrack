import categoryValidation from "../validations/category-validation.js"
import validation from "../validations/validation.js"
import Category from "../models/category-model.js"
import ResponseError from "../error/error-response.js"

const all = async ({ userId, type }) => {
  validation(categoryValidation.all, { type })
  const categories = await Category.find({ user: userId, type }).sort({
    createdAt: -1,
  })
  return categories
}

const create = async (request) => {
  const { userId, name, type, icon } = validation(
    categoryValidation.create,
    request
  )

  const category = await Category.create({ user: userId, name, type, icon })
  return category
}

const update = async (request) => {
  const { id, name, icon } = validation(categoryValidation.update, request)

  const category = await Category.findById(id)
  if (!category) {
    throw new ResponseError("Category not found", 404)
  }

  category.name = name
  category.icon = icon

  await category.save()
  return category
}

const remove = async (request) => {
  const id = validation(categoryValidation.remove, request)

  const deletedCategory = await Category.findByIdAndDelete(id)
  if (!deletedCategory) {
    throw new ResponseError("Category not found", 404)
  }
  return deletedCategory
}

export default {
  all,
  create,
  update,
  remove,
}
