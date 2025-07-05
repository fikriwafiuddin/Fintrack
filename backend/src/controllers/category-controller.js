import categoryService from "../service/category-service.js"

const all = async (req, res, next) => {
  try {
    const userId = req.userId
    const type = req.params?.type
    const categories = await categoryService.all({ userId, type })
    res.status(200).json({
      message: "Categories fetched successfully",
      data: { categories },
    })
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  const userId = req.userId
  try {
    const category = await categoryService.create({ userId, ...req.body })
    res.status(201).json({
      message: "Category created successfully",
      data: { category },
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id
    const request = req.body

    const category = await categoryService.update({ ...request, id })
    return res.status(200).json({
      message: "Category updated successfully",
      data: { category },
    })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.id

    const category = await categoryService.remove(id)
    return res.status(200).json({
      message: "Category deleted successfully",
      data: { category },
    })
  } catch (error) {
    next(error)
  }
}

export default {
  all,
  create,
  update,
  remove,
}
