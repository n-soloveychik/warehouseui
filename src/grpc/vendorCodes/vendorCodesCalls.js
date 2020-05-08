export const getVendorCodesHandler = async (client, RequestClass, convert) => {
  const request = new RequestClass()
  const result = await new Promise((resolve) =>
    client.getStoredVendorCodes(request, null, (err, response) =>
      resolve(response),
    ),
  )
  return convert(result.toObject().vendorCodesList)
}
