export const categoryOptionsGetter = (all, inVendor) => {
  return all.filter(
    (cat) => !inVendor.find((c) => c.categoryId === cat.categoryId),
  )
}
