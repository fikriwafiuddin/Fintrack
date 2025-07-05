import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearMsg as authClearMessage } from "../store/slice/authSlice"
import { clearMsg as categoryClearMessage } from "../store/slice/categorySlice"

function useMessage() {
  const authMsg = useSelector((state) => state.auth.message)
  const categoryMsg = useSelector((state) => state.category.message)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authMsg.success) {
      toast.success(authMsg.success)
      dispatch(authClearMessage())
    } else if (authMsg.error) {
      toast.error(authMsg.error)
      dispatch(authClearMessage())
    }
  }, [authMsg.success, authMsg.error, dispatch])

  useEffect(() => {
    if (categoryMsg.success) {
      toast.success(categoryMsg.success)
      dispatch(categoryClearMessage())
    } else if (categoryMsg.error) {
      toast.error(categoryMsg.error)
      dispatch(categoryClearMessage())
    }
  }, [categoryMsg.error, categoryMsg.success, dispatch])
}

export default useMessage
