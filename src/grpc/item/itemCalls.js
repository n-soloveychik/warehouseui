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
