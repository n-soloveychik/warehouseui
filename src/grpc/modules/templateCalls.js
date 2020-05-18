export const getVendorTemplatesHandler = async (client, RequestClass) => {
  const request = new RequestClass()
  const result = await new Promise((resolve) =>
    client.getVendorTemplates(request, null, (err, response) =>
      resolve(response),
    ),
  )
  return result.toObject().vendorTemplatesList
}

export const createVendorTemplateHandler = async (
  client,
  RequestClass,
  vendorCode,
) => {
  const request = new RequestClass()
  request.setVendorCode(vendorCode)
  const result = await new Promise((resolve) =>
    client.createVendorTemplate(request, null, (err, response) =>
      resolve(response),
    ),
  )
  console.log(result)
  return result.toObject()
}

export const getItemTemplatesByVendorCodeHandler = async (
  client,
  RequestClass,
  vendorId,
) => {
  const request = new RequestClass()
  request.setVendorId(+vendorId)
  const result = await new Promise((resolve) =>
    client.getItemTemplatesByVendorId(request, null, (err, response) =>
      resolve(response),
    ),
  )
  return result.toObject().itemsList
}

export const createCategoryHandler = async (
  client,
  RequestClass,
  categoryName,
) => {
  const request = new RequestClass()
  request.setCategoryName(categoryName)
  const result = await new Promise((resolve) =>
    client.createItemCategory(request, null, (err, response) =>
      resolve(response),
    ),
  )
  return result.toObject().category
}

export const getCategoriesHandler = async (client, RequestClass) => {
  const request = new RequestClass()
  const result = await new Promise((resolve) =>
    client.getItemCategories(request, null, (err, response) =>
      resolve(response),
    ),
  )
  return result.toObject().itemCategoriesList
}

export const createItemHandler = async (
  client,
  RequestClass,
  {
    categoryId,
    lot,
    image,
    size,
    count,
    itemNum,
    weight,
    description,
    category,
  },
) => {
  const request = new RequestClass()

  request.setCategoryId(categoryId)
  request.setCount(count)
  request.setDescription(description)
  request.setImage(image)
  request.setItemNum(itemNum)
  request.setLot(lot)
  request.setSize(size)
  request.setWeight(weight)

  const result = await new Promise((resolve) =>
    client.createItemTemplate(request, null, (err, response) =>
      resolve(response),
    ),
  )
  return result?.toObject()?.item
}

export const addItemToVendorHandler = async (
  client,
  RequestClass,
  { itemId, vendorId },
) => {
  const request = new RequestClass()
  request.setItemId(itemId)
  request.setVendorId(vendorId)
  const result = await new Promise((resolve) =>
    client.addItemTemplateToVendorTemplate(request, null, (err, response) =>
      resolve(response),
    ),
  )

  return result
}
