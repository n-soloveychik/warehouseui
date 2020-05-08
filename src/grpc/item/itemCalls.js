export const getItemsHandler = async (client, RequestClass, vendorCode) => {
  const request = new RequestClass()
  request.setVendorCode('000-1232')
  const result = await new Promise((resolve) => {
    client.getItemsByVendorCode(request, null, (err, response) => {
      resolve(response)
    })
  })
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
