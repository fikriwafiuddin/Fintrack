import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import authValidation from "../validations/auth-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { updateProfile } from "../store/thunk/auth-thunk"
import { useEffect } from "react"

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(authValidation.updateProfile),
    mode: "onSubmit",
    defaultValues: {},
  })
  const { user, isLoading, message } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user, reset])

  useEffect(() => {
    if (message.success) {
      setEditMode(false)
    }
  }, [message.success])

  const onSubmit = async (data) => {
    dispatch(updateProfile(data))
      .unwrap()
      .catch((backendErrors) => {
        for (const key in backendErrors?.errors) {
          setError(key, { message: backendErrors.errors[key][0] })
        }
      })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              disabled={!editMode}
              className={`w-full border rounded-lg px-3 py-2 ${
                editMode ? "bg-white" : "bg-gray-100"
              }`}
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Balance
            </label>
            <input
              type="number"
              {...register("balance")}
              disabled={!editMode}
              className="w-full border bg-gray-100 rounded-lg px-3 py-2"
            />
            {errors.balance && (
              <p className="text-sm text-red-600">{errors.balance.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            {editMode && (
              <>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  {isLoading ? "Loading" : "Save"}
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  className="text-gray-600 hover:underline"
                  onClick={() => {
                    setEditMode(false)
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
        {!editMode && (
          <div className="">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
