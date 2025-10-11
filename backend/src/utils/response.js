class SuccessResponse {
  constructor(message, data = {}, meta = {}) {
    this.success = true
    this.message = message
    this.data = data
    this.meta = {
      timestamp: new Date().toISOString(),
      ...meta,
    }
  }
}

class ErrorResponse {
  constructor(message, status = 500, errors = {}, data = {}, meta = {}) {
    this.success = false
    this.message = message
    this.status = status
    this.errors = errors
    this.data = data
    this.meta = {
      timestamp: new Date().toISOString(),
      ...meta,
    }
  }
}

export { SuccessResponse, ErrorResponse }
