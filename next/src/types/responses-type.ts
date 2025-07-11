export type ApiResponse<T> = {
  message: string
  data: T
}

interface FieldErrors {
  [key: string]: string[]
}

export type ApiError = {
  message: string
  errors: FieldErrors
}
