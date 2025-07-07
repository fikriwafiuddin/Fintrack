import transactionService from "../service/transaction-service.js"

const create = async (req, res, next) => {
  try {
    const userId = req.userId

    const transaction = await transactionService.create(req.body, userId)
    return res.status(201).json({
      message: "Transaction created successfully",
      data: { transaction },
    })
  } catch (error) {
    next(error)
  }
}

const all = async (req, res, next) => {
  try {
    const userId = req.userId
    const type = req.params.type

    const transactions = await transactionService.all(type, userId)
    return res.status(200).json({
      message: "Transactions fetched successfully",
      data: { transactions },
    })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.userId

    const transaction = await transactionService.remove(id, userId)
    return res.status(200).json({
      message: "Transaction deleted successfully",
      data: { transaction },
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.userId
    const id = req.params.id

    const transaction = await transactionService.update(
      { id, ...req.body },
      userId
    )
    return res.status(200).json({
      message: "Transaction updated successfully",
      data: { transaction },
    })
  } catch (error) {
    next(error)
  }
}

export default {
  create,
  all,
  remove,
  update,
}
