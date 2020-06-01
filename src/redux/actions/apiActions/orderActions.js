import { apiCoreAction } from './apiCoreAction'

export const getOrdersAction = async (dispatch, actionNameObj, requestFn) => {
  await apiCoreAction(dispatch, actionNameObj, requestFn)
}
