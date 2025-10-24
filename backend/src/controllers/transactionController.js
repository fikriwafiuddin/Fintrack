import transactionService from "../services/transactionService.js"
import { SuccessResponse } from "../utils/response.js"

const create = async (req, res, next) => {
  try {
    const request = req.body
    const user = req.user

    const transaction = await transactionService.create(request, user)

    return res
      .status(201)
      .json(
        new SuccessResponse("Transaction successfully created", { transaction })
      )
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const request = { ...req.body, id: req.params.id }
    const user = req.user

    const transaction = await transactionService.update(request, user)

    return res
      .status(200)
      .json(
        new SuccessResponse("Transaction successfully updated", { transaction })
      )
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = req.user

    const transaction = await transactionService.remove({ id }, user)

    return res
      .status(200)
      .json(
        new SuccessResponse("Transaction successfully deleted", { transaction })
      )
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.query

    const { transactions, pagination, filters } =
      await transactionService.getAll(request, user)

    return res.status(200).json(
      new SuccessResponse(
        "Transactions successfully retrieved",
        {
          transactions,
        },
        {
          pagination,
          filters,
        }
      )
    )
  } catch (error) {
    next(error)
  }
}

const transactionController = {
  create,
  update,
  remove,
  getAll,
}
export default transactionController
