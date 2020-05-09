export const vendorCodesGetter = (state) => {
  const vendorCodes = state.warehouse.vendorCodes
  let result = {}
  vendorCodes.forEach((vendor) =>
    result[vendor.orderNum]
      ? result[vendor.orderNum].push(vendor.vendorCode)
      : (result[vendor.orderNum] = [vendor.vendorCode]),
  )
  return result
}
