import { apiCoreAction } from './apiCoreAction'

export const getInvoicesByOrderAction = async (
  dispatch,
  actionName,
  requestFn,
  requestData,
) => {
  await apiCoreAction(dispatch, actionName, requestFn, requestData)
}
