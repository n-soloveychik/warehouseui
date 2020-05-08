export const converVendorCodes = (vendorCodes) => {
  let result = {}
  vendorCodes.forEach((vendor) =>
    result[vendor.orderNum]
      ? result[vendor.orderNum].push(vendor.vendorCode)
      : (result[vendor.orderNum] = [vendor.vendorCode]),
  )
  return result
}
