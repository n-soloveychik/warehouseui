import {
  SELECT_CURRENT_ACCOUNT_CONTRACT,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
} from './actionNames'
import { getAccountContractsAction } from './grpcActions/accountContractActions'
import { grpc } from '@/grpc/index'

export const selectAccountContract = (id) => ({
  type: SELECT_CURRENT_ACCOUNT_CONTRACT,
  accountContract: id,
})

export const selectVendorCode = (id) => ({
  type: SELECT_CURRENT_VENDOR_CODE,
  vendorCode: id,
})

export function getAccountContracts(dispatch) {
  return getAccountContractsAction(
    dispatch,
    GRPC.ACCOUNT_CONTRACT.GET,
    grpc.accountContracts.get,
  )
}
