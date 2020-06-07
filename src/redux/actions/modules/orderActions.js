import { apiCoreAction } from './apiCoreAction'
import { API, APP } from '../actionNames'
import { REQUEST } from '@/api'
import { getInvoicesByOrderAction } from './invoiceAction'

export const getOrdersAction = async (dispatch) => {
  await apiCoreAction(
    dispatch,
    API.AVAILABLE_ORDERS.GET,
    REQUEST.getAvailableOrders
  )
}

export const selectOrderAction = async (dispatch, order) => {
  dispatch({
    type: APP.AVAILABLE_ORDER.CURRENT.SELECT,
    order: order.order_id,
  })
  await getInvoicesByOrderAction(dispatch, order.order_id)
}
