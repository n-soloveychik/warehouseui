export const checkItemsGetter = (items) => {
  const groupedItems = items.reduce((acc, cur) => {
    const category = acc.find((obj) => obj.categoryId === cur.categoryId)
    if (category) {
      category.lots.push(cur)
      return acc
    }
    acc.push({
      categoryId: cur.categoryId,
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

export const editItemsGetter = (items, categories) => {
  const groupedItems = items.reduce((acc, cur) => {
    const category = acc.find((obj) => obj.categoryId === cur.categoryId)
    if (category) {
      category.items.push(cur)
      return acc
    }
    acc.push({
      category: cur.category,
      categoryId: cur.categoryId,
      items: [cur],
    })
    return acc
  }, [])
  groupedItems.forEach(
    (category) =>
      (category.category = categories.find(
        (c) => c.categoryId === category.categoryId,
      )?.category),
  )
  return groupedItems
}
