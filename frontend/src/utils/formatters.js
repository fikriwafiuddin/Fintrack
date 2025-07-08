export const formatCurrency = (number) => {
  if (typeof number != "number") return number

  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  })
}

export const formatDate = (date) => {
  if (!date) return null

  return new Date(date).toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  })
}

export const stringToDate = (string) => {
  if (!string) return null

  const date = new Date(string)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}`
}
