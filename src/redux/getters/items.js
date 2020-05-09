export const itemsGetter = (state) => {
  const items = state.warehouse.items
  const groupedItems = items.reduce((acc, cur) => {
    const category = acc.find((obj) => obj.name === cur.category)
    if (category) {
      category.lots.push(cur)
      return acc
    }
    acc.push({ name: cur.category, lots: [cur] })
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
