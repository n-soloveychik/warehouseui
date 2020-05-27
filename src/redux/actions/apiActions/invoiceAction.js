import { apiCoreAction } from './apiCoreAction'

export const getInvoicesByOrder = async (
  dispatch,
  actionName,
  requestFn,
  requestData,
) => {
  await apiCoreAction(dispatch, actionName, requestFn, requestData)
}
