export const categoryOptionsGetter = (all, inInvoice) => {
  return all.filter(
    (cat) => !inInvoice.find((c) => c.category_id === cat.category_id),
  )
}
