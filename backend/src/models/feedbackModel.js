import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Feedback = mongoose.model("Feedback", feedbackSchema)
export default Feedback
