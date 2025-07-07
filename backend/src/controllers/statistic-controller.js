import statisticService from "../service/statistic-service.js"

const statisticPerMonth = async (req, res, next) => {
  try {
    const userId = req.userId
    const { type, month, year } = req.query
    const data = await statisticService.statisticPerMonth(
      { type, month, year },
      userId
    )
    return res.status(200).json({
      message: "Total amount per month successfully fetched",
      data: {
        ...data,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default {
  statisticPerMonth,
}
