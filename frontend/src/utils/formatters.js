export const formatCurrency = (number) => {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  })
}

export const formatDate = (date) => {
  return new Date(date).toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  })
}
