import { grpcCoreAction } from './grpcCoreAction'

export const getItemsAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  accountContract,
) => {
  await grpcCoreAction(dispatch, actionNameObj, requestFn, accountContract)
}

export const updateItemStatusAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  { itemId, statusId },
) => {
  await grpcCoreAction(dispatch, actionNameObj, requestFn, { itemId, statusId })
}
