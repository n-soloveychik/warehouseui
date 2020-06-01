import { apiCoreAction } from './apiCoreAction'

export const getItemsAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  accountContract,
) => {
  await apiCoreAction(dispatch, actionNameObj, requestFn, accountContract)
}

export const itemUpdateStatusAction = async (
  dispatch,
  actionNameObj,
  requestFn,
) => {
  await apiCoreAction(dispatch, actionNameObj, requestFn)
}
