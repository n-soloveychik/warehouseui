export const checkItemsGetter = (state) => {
  state = state.warehouse
  const items =
    state.invoices?.length && state.currentInvoice
      ? state.invoices.find(
          (invoice) => invoice.invoice_code === state.currentInvoice,
        )?.items
      : null
  if (!items || !(items instanceof Array)) {
    return []
  }
  const groupedItems = items.reduce((acc, cur) => {
    const category = acc.find((obj) => obj.category === cur.category)
    if (category) {
      category.lots.push(cur)
      return acc
    }
    acc.push({
      category: cur.category,
      lots: [cur],
    })
    return acc
  }, [])
  Object.keys(groupedItems).forEach(
    (key) =>
      (groupedItems[key].lots = groupedItems[key].lots.reduce((acc, cur) => {
        const lot = acc.find((obj) => obj.name === cur.lot)
        if (lot) {
          lot.items.push(cur)
          return acc
        }
        acc.push({ name: cur.lot, items: [cur] })
        return acc
      }, [])),
  )
  return groupedItems
}

export const templateItemsGetter = (items, categories) => {
  const groupedItems = items.reduce((acc, cur) => {
    const category = acc.find((obj) => obj.category_id === cur.category_id)
    if (category) {
      category.items.push(cur)
      return acc
    }
    acc.push({
      category: cur.category,
      category_id: cur.category_id,
      items: [cur],
    })
    return acc
  }, [])
  groupedItems.forEach(
    (category) =>
      (category.category_name = categories.find(
        (c) => c.category_id === category.category_id,
      )?.category_name),
  )
  return groupedItems
}
