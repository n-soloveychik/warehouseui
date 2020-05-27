import { apiCoreAction } from './apiCoreAction'

export const getItemsAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  accountContract,
) => {
  await apiCoreAction(dispatch, actionNameObj, requestFn, accountContract)
}

export const updateItemStatusAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  { itemId, statusId },
) => {
  await apiCoreAction(dispatch, actionNameObj, requestFn, { itemId, statusId })
}
