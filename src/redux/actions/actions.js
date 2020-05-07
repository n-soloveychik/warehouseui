import {
  SELECT_CURRENT_ACCOUNT_CONTRACT,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
} from './actionNames'
import { getOrdersAction } from './grpcActions/orderActions'
import { grpc } from '@/grpc/index'

export const selectOrder = (id) => ({
  type: SELECT_CURRENT_ACCOUNT_CONTRACT,
  order: id,
})

export const selectVendorCode = (id) => ({
  type: SELECT_CURRENT_VENDOR_CODE,
  vendorCode: id,
})

export function getOrders(dispatch) {
  return getOrdersAction(dispatch, GRPC.ACCOUNT_CONTRACT.GET, grpc.orders.get)
}
