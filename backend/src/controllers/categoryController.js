import categoryService from "../services/categoryService.js"
import { SuccessResponse } from "../utils/response.js"
import validation from "../validations/validation.js"
import categoryValidation from "../validations/categoryValidation.js"

const create = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body

    const validatedRequest = validation(categoryValidation.create, request)
    const category = await categoryService.create(validatedRequest, user)
    return res
      .status(201)
      .json(new SuccessResponse("Category successfully created", category))
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const user = req.user
    const request = { ...req.body, id: req.params.id }

    const validatedRequest = validation(categoryValidation.update, request)
    const category = await categoryService.update(validatedRequest, user)
    return res
      .status(200)
      .json(new SuccessResponse("Category successfully updated", category))
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const user = req.user
    const { id } = req.params

    validation(categoryValidation.remove, { id })
    const category = await categoryService.remove(id, user)
    return res
      .status(200)
      .json(new SuccessResponse("Category successfully deleted", category))
  } catch (error) {
    next(error)
  }
}
const getAll = async (req, res, next) => {
  try {
    const user = req.user

    const defaultCategories = await categoryService.getAll(
      { isDefault: true },
      user,
    )
    const customCategories = await categoryService.getAll(
      { isDefault: false },
      user,
    )
    return res.status(200).json(
      new SuccessResponse("Categories successfully retrieved", {
        defaultCategories,
        customCategories,
      }),
    )
  } catch (error) {
    next(error)
  }
}

const categoryController = {
  create,
  update,
  remove,
  getAll,
}
export default categoryController
