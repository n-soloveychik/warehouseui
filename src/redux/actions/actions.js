import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
} from './actionNames'
import { getOrdersAction } from './grpcActions/orderActions'
import { getItemsAction } from './grpcActions/itemActions'
import { grpc } from '@/grpc/index'

export const selectOrder = (id) => ({
  type: SELECT_CURRENT_ORDER,
  order: id,
})

export const selectVendorCode = (id) => ({
  type: SELECT_CURRENT_VENDOR_CODE,
  vendorCode: id,
})

export function getOrders(dispatch) {
  return getOrdersAction(dispatch, GRPC.ORDERS.GET, grpc.orders.get)
}

export function getItemsByVendorCode(dispatch, vendorCode) {
  return getItemsAction(dispatch, GRPC.ITEMS.GET, grpc.items.get, vendorCode)
}
