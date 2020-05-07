import {
  SELECT_CURRENT_ACCOUNT_CONTRACT,
  SELECT_CURRENT_VENDOR_CODE,
} from './actionNames'

export const selectAccountContract = (id) => ({
  type: SELECT_CURRENT_ACCOUNT_CONTRACT,
  accountContract: id,
})

export const selectVendorCode = (id) => ({
  type: SELECT_CURRENT_VENDOR_CODE,
  vendorCode: id,
})
