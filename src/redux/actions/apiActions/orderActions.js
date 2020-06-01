import { apiCoreAction } from './apiCoreAction'
import { SELECT_CURRENT_ORDER, API } from '../actionNames'
import { REQUEST } from '@/api'
import { getInvoicesByOrderAction } from './invoiceAction'

export const getOrdersAction = async (dispatch) => {
  await apiCoreAction(dispatch, API.ORDERS.GET, REQUEST.getAvailableOrders)
}

export const selectOrderAction = async (dispatch, order) => {
  dispatch({
    type: SELECT_CURRENT_ORDER,
    order: order.order_num,
  })
  await getInvoicesByOrderAction(dispatch, order.order_id)
}
