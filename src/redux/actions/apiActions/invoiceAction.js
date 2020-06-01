import { apiCoreAction } from './apiCoreAction'
import { SELECT_CURRENT_INVOICE, API } from '../actionNames'
import { REQUEST } from '@/api'

export const getInvoicesByOrderAction = async (dispatch, orderId) => {
  console.log(orderId)
  await apiCoreAction(
    dispatch,
    API.INVOICES.GET,
    REQUEST.getInvoicesAndItemsByOrder.bind(null, orderId),
  )
}

export const selectInvoiceAction = async (dispatch, invoice) => {
  dispatch({
    type: SELECT_CURRENT_INVOICE,
    invoice: invoice.invoice_id,
  })
  dispatch({
    type: API.ITEMS.SET_BY_INVOICE,
  })
}
