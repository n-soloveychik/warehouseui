export const invoicesGetter = (state) => {
  const invoices = state.warehouse.invoices
  let result = {}
  invoices.forEach((invoice) =>
    result[invoice.orderNum]
      ? result[invoice.orderNum].push(invoice.invoice)
      : (result[invoice.orderNum] = [invoice.invoice]),
  )
  return result
}
