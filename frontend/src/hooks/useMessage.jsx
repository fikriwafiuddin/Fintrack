import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearMsg as authClearMessage } from "../store/slice/authSlice"

function useMessage() {
  const authMsg = useSelector((state) => state.auth.message)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authMsg.success) {
      toast.success(authMsg.success)
      dispatch(authClearMessage())
    }
  }, [authMsg, dispatch])
}

export default useMessage
