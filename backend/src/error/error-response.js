class ResponseError extends Error {
  constructor(message, status = 500, data = {}) {
    super(message)
    this.status = status
    this.data = data
  }
}

export default ResponseError
