import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
  TEMPLATES,
} from './actionNames'
import { getOrdersAction } from './grpcActions/orderActions'
import {
  getItemsAction,
  updateItemStatusAction,
} from './grpcActions/itemActions'
import { grpc } from '@/grpc/index'
import {
  getVendorTemplatesAction,
  createVendorTemplateAction,
} from './grpcActions/templateAction'

export function getOrders(dispatch) {
  return getOrdersAction(dispatch, GRPC.ORDERS.GET, grpc.orders.get)
}

export function getItemsByVendorCode(dispatch, vendorCode) {
  return getItemsAction(dispatch, GRPC.ITEMS.GET, grpc.items.get, vendorCode)
}

export function updateItemStatus(dispatch, { statusId, itemId }) {
  return updateItemStatusAction(
    dispatch,
    GRPC.ITEMS.UPDATE,
    grpc.items.updateStatus,
    { itemId, statusId },
  )
}

export const selectVendorCode = (dispatch, vendorCode) => {
  dispatch({
    type: SELECT_CURRENT_VENDOR_CODE,
    vendorCode,
  })
  getItemsByVendorCode(dispatch, vendorCode)
}

export const selectOrder = (dispatch, order) => {
  dispatch({
    type: SELECT_CURRENT_ORDER,
    order,
  })
}

export const templateActions = {
  vendor: {
    get: (dispatch) => getVendorTemplatesAction(dispatch),
    create: (dispatch, vendorCode) =>
      createVendorTemplateAction(dispatch, vendorCode),
  },
  vendorPage: {
    showCreateVendor: (dispatch) =>
      dispatch({ type: TEMPLATES.VENDOR_PAGE_SHOW_ADD_VENDOR }),
    hideCreateVendor: (dispatch) =>
      dispatch({ type: TEMPLATES.VENDOR_PAGE_HIDE_ADD_VENDOR }),
  },
  itemPage: {
    setCurrentVendor: (dispatch, vendorId) => {
      dispatch({ type: TEMPLATES.ITEM_PAGE_SET_CURRENT_VENDOR, vendorId })
    },
  },
}
