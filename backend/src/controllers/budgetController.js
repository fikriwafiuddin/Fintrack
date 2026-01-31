import budgetService from "../services/budgetService.js"
import { SuccessResponse } from "../utils/response.js"
import budgetValidation from "../validations/budgetValidation.js"
import validation from "../validations/validation.js"

const create = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const validatedRequest = validation(budgetValidation.create, request)
    const budget = await budgetService.create(validatedRequest, user)
    return res
      .status(201)
      .json(new SuccessResponse("Budget successfully created", { budget }))
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const request = { ...req.body, id: req.params.id }
    const user = req.user

    const validatedRequest = validation(budgetValidation.update, request)
    const budget = await budgetService.update(validatedRequest, user)
    return res
      .status(200)
      .json(new SuccessResponse("Budget successfull update", { budget }))
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = req.user

    validation(budgetValidation.remove, { id })

    const budget = await budgetService.remove(id, user)
    return res
      .status(200)
      .json(new SuccessResponse("Budget successfull removed", { budget }))
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const validatedRequest = validation(budgetValidation.getAll, request)
    const { budgets, filters } = await budgetService.getAll(
      validatedRequest,
      user,
    )
    return res
      .status(200)
      .json(
        new SuccessResponse(
          "Budgets successfull retrieved",
          { budgets },
          { filters },
        ),
      )
  } catch (error) {
    next(error)
  }
}

const budgetController = {
  create,
  update,
  remove,
  getAll,
}
export default budgetController
