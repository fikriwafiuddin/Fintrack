import Budget from "../models/budgetModel.js"
import Category from "../models/categoryModel.js"
import { ErrorResponse } from "../utils/response.js"
import budgetValidation from "../validations/budgetValidation.js"
import validation from "../validations/validation.js"

const create = async (request, user) => {
  const { category, amount, period, startDate, endDate } = validation(
    budgetValidation.create,
    request
  )

  // 1. Check category is exist
  const categoryIsExist = await Category.findById(category)
  if (
    !categoryIsExist ||
    (categoryIsExist.user &&
      categoryIsExist.user.toString() !== user.toString())
  ) {
    throw new ErrorResponse("Category not found", 404, {
      category: ["Category not found"],
    })
  }

  // 2. Check type category if income
  if (categoryIsExist.type === "income") {
    throw new ErrorResponse("Category type is income", 400, {
      category: ["Category type is income"],
    })
  }

  // 3. Check if overlapping budget
  const overlappingBudget = await Budget.findOne({
    user,
    category,
    $or: [
      {
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
      },
    ],
  })
  if (overlappingBudget) {
    throw new ErrorResponse("Overlapping time span with other budgets", 400, {
      startDate: ["Overlapping time span with other budgets"],
      endDate: ["Overlapping time span with other budgets"],
    })
  }

  // 4. Create budget
  const budget = await Budget.create({
    user,
    category,
    amount,
    period,
    startDate,
    endDate,
  })
  return budget
}

const update = async (request, user) => {
  const { id, category, amount, period, startDate, endDate } = validation(
    budgetValidation.update,
    request
  )

  // 1. Check budget
  const budget = await Budget.findOne({ _id: id, user })
  if (!budget) {
    throw new ErrorResponse("Budget not found", 404)
  }

  // 2. Check if the category or date range has changed
  const isCategoryChanged =
    category && category.toString() !== budget.category.toString()
  const isDateChanged =
    new Date(startDate).getTime() !== new Date(budget.startDate).getTime() ||
    new Date(endDate).getTime() !== new Date(budget.endDate).getTime()

  // 3. Check category
  if (isCategoryChanged) {
    const categoryIsExist = await Category.findById(category)
    if (
      !categoryIsExist ||
      (categoryIsExist.user &&
        categoryIsExist.user.toString() !== user.toString())
    ) {
      throw new ErrorResponse("Category not found")
    }

    // 4. Check type category if income
    if (categoryIsExist.type === "income") {
      throw new ErrorResponse("Category type is income", 400, {
        category: ["Category type is income"],
      })
    }
  }

  if (isCategoryChanged || isDateChanged) {
    // 5. Check if there are any other budgets (besides your own) that overlap in the same category.
    const overlappingBudget = await Budget.findOne({
      user,
      _id: { $ne: id }, // exclude current budget
      category: category || budget.category,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    })

    if (overlappingBudget) {
      throw new ErrorResponse("Overlapping time span with other budgets", 400, {
        startDate: ["Overlapping time span with other budgets"],
        endDate: ["Overlapping time span with other budgets"],
      })
    }
  }

  // 6. Update budget
  budget.category = category
  budget.amount = amount
  budget.period = period
  budget.startDate = startDate
  budget.endDate = endDate

  // 7. Save budget
  await budget.save()

  return budget
}

const remove = async (request, user) => {
  const { id } = validation(budgetValidation.remove, request)

  // 1. Check budget and remove
  const budget = await Budget.findOneAndDelete({ _id: id, user })
  if (!budget) {
    throw new ErrorResponse("Budget not found", 404)
  }

  return budget
}

const getAll = async (request, user) => {
  const { startDate, endDate } = validation(budgetValidation.getAll, request)

  const filter = {
    user,
    $or: [
      {
        startDate: { $gte: startDate, $lte: endDate },
      },
      {
        endDate: { $gte: startDate, $lte: endDate },
      },
      {
        $and: [
          { startDate: { $lte: startDate } },
          { endDate: { $gte: endDate } },
        ],
      },
    ],
  }

  const budgets = await Budget.find(filter)
    .populate({
      path: "category",
      select: "name icon color",
      options: { includeDeleted: true },
    })
    .sort({ startDate: 1 })
    .lean()

  return { budgets, filters: { startDate, endDate } }
}

const budgetService = {
  create,
  update,
  remove,
  getAll,
}
export default budgetService
