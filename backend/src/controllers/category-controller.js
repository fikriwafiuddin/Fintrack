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

export default {
  all,
}
