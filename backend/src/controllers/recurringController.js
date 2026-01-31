import recurringService from "../services/recurringService.js"
import { SuccessResponse } from "../utils/response.js"
import validation from "../validations/validation.js"
import recurringValidation from "../validations/recurringValidation.js"

const create = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const validatedRequest = validation(recurringValidation.create, request)
    const recurring = await recurringService.create(validatedRequest, user)

    return res.status(201).json(
      new SuccessResponse("Recurring transaction successfully created", {
        recurring,
      }),
    )
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const request = { ...req.body, id: req.params.id }
    const user = req.user

    const validatedRequest = validation(recurringValidation.update, request)
    const recurring = await recurringService.update(validatedRequest, user)

    return res.status(200).json(
      new SuccessResponse("Recurring transaction successfully updated", {
        recurring,
      }),
    )
  } catch (error) {
    next(error)
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = req.user

    validation(recurringValidation.updateStatus, { id })
    const recurring = await recurringService.updateStatus(id, user)

    return res.status(200).json(
      new SuccessResponse("Recurring transaction status updated", {
        recurring,
      }),
    )
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = req.user

    validation(recurringValidation.remove, { id })
    const recurring = await recurringService.remove(id, user)

    return res.status(200).json(
      new SuccessResponse("Recurring transaction successfully deleted", {
        recurring,
      }),
    )
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const validatedRequest = validation(recurringValidation.getAll, request)
    const recurrings = await recurringService.getAll(validatedRequest, user)

    return res.status(200).json(
      new SuccessResponse("Recurring transactions successfully retrieved", {
        recurrings,
      }),
    )
  } catch (error) {
    next(error)
  }
}

const recurringController = {
  create,
  update,
  updateStatus,
  remove,
  getAll,
}
export default recurringController
