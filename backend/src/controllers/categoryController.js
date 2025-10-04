import categoryService from "../services/categoryService.js"
import { SuccessResponse } from "../utils/response.js"

const create = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body

    const category = await categoryService.create(request, user)
    res
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

    const category = await categoryService.update(request, user)
    res
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

    const category = await categoryService.remove({ id }, user)
    res
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
      user
    )
    const customCategories = await categoryService.getAll(
      { isDefault: false },
      user
    )
    res.status(200).json(
      new SuccessResponse("Categories successfully retrieved", {
        defaultCategories,
        customCategories,
      })
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
