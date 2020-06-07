import { apiCoreAction } from './apiCoreAction'
import { API, APP } from '../actionNames'
import { REQUEST } from '@/api'

export const getInvoicesByOrderAction = async (dispatch, orderId) => {
  await apiCoreAction(
    dispatch,
    API.INVOICES.GET,
    REQUEST.getInvoicesAndItemsByOrder.bind(null, orderId)
  )
}

export const selectInvoiceAction = async (dispatch, invoice) => {
  dispatch({
    type: APP.INVOICE.CURRENT.SELECT,
    invoice: invoice.invoice_id,
  })
  dispatch({
    type: API.ITEMS.SET_BY_INVOICE,
  })
}
