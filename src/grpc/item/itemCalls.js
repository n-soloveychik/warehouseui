export const getItemsHandler = async (client, RequestClass, vendorCode) => {
  const request = new RequestClass()
  request.setVendorCode(vendorCode)
  const result = await new Promise((resolve) => {
    client.getItemsByVendorCode(request, null, (err, response) => {
      resolve(response)
    })
  })
  console.log(client)
  return result.toObject().itemsList
}

export const updateItemStatusHandler = async (
  client,
  RequestClass,
  { itemId, statusId },
) => {
  const request = new RequestClass()
  request.setItemId(itemId)
  request.setStatusId(statusId)
  const result = await new Promise((resolve) => {
    client.updateItemStatus(request, null, (err, response) => resolve(response))
  })
  return Object.assign(result.toObject(), { statusId })
}

export const setItemStatusClaim = async (
  client,
  RequestClass,
  { itemId, images, description },
) => {
  const request = new RequestClass()
  request.setItemId(itemId)
  request.setImages(images)
  request.setDescription(description)
  const result = await new Promise((resolve) => {
    client.SetItemStatusClaim(request, null, (err, response) =>
      resolve(response),
    )
  })
}
