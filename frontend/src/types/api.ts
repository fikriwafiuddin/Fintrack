export interface ErrorResponse<TErrors> {
  success: false
  message: string
  errors: TErrors
  data: object
  meta: { timestamp: string }
}

export interface CategoryFieldErrors {
  name?: string[]
  type?: string[]
  color?: string[]
}
