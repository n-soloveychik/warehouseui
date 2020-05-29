import { REQUEST } from '@/api'
import { ERROR, ROUTER, APP } from '../actionNames'

export const setCurrentOrderInvoiceAction = async (
  dispatch,
  order_num,
  invoice_code,
) => {
  let response = await REQUEST.getAvailableOrders()
  if (!checkAuth(dispatch, response)) {
    return
  }
  const orders = response.data
  response = await REQUEST.getInvoicesAndItemsByOrder(
    orders.find((order) => order.order_num === order_num)?.order_id,
  )
  if (!checkAuth(dispatch, response)) {
    return
  }
  const invoices = response.data
  dispatch({
    type: APP.SET.ORDERS_INVOICES_CURRENT_ORDER_INVOICE,
    orders,
    invoices,
    currentOrder: order_num,
    currentInvoice: invoice_code,
  })
}

function checkAuth(dispatch, response) {
  if (response.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED })
    return false
  }
  return true
}
