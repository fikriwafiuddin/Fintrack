import Category from "../models/categoryModel.js"
import { ErrorResponse } from "../utils/response.js"
import categoryValidation from "../validations/categoryValidation.js"
import validation from "../validations/validation.js"

const create = async (request, user) => {
  const { name, type, color } = validation(categoryValidation.create, request)

  // 1. Check if custom category already exists
  const category = await Category.findOne({ name, user })
  if (category) {
    throw new ErrorResponse("Category already exists", 400, [
      { name: ["Category already exists"] },
    ])
  }

  // 2. Check if default category already exists
  const defaultCategory = await Category.findOne({
    name,
  })
  if (defaultCategory) {
    throw new ErrorResponse("Category already exists", 400, [
      { name: ["Category already exists"] },
    ])
  }

  // 3. Create category
  const newCategory = await Category.create({ name, type, color, user })
  return newCategory
}

const update = async (request, user) => {
  const { id, name, type, color } = validation(
    categoryValidation.update,
    request
  )

  // 1. Check if category exists
  const category = await Category.findOne({ _id: id, user })
  if (!category) {
    throw new ErrorResponse("Category not found", 404)
  }

  // 2. Check if custom category name is taken
  const categoryName = await Category.findOne({ name, user, _id: { $ne: id } })
  if (categoryName) {
    throw new ErrorResponse("Category name is already taken", 400, [
      { name: ["Category name is already taken"] },
    ])
  }

  // 3. Check if default category name is taken
  const defaultCategoryName = await Category.findOne({
    name,
    isDefault: true,
  })
  if (defaultCategoryName) {
    throw new ErrorResponse("Category name is already taken", 400, [
      { name: ["Category name is already taken"] },
    ])
  }

  // 4. Check if category isDefault
  if (category.isDefault) {
    throw new ErrorResponse("Default category cannot be updated", 400)
  }

  // 5. Update category
  category.name = name
  category.type = type
  category.color = color
  await category.save()
  return category
}

const remove = async (request, user) => {
  const { id } = validation(categoryValidation.remove, request)

  // 1. Check if category exists
  const category = await Category.findOne({ _id: id, user })
  if (!category) {
    throw new ErrorResponse("Category not found", 404)
  }

  // 2. Check if category isDefault
  if (category.isDefault) {
    throw new ErrorResponse("Default category cannot be deleted", 400)
  }

  // 3. Soft delete category
  category.deleted = true
  category.deletedAt = new Date()
  await category.save()
  return category
}

const getAll = async (request, user) => {
  const { isDefault } = request

  if (!isDefault) {
    return await Category.find({ user, isDefault }).sort({ createdAt: -1 })
  } else {
    return await Category.find({ isDefault }).sort({ createdAt: -1 })
  }
}

const categoryService = {
  create,
  update,
  remove,
  getAll,
}
export default categoryService
