import { grpcCoreAction } from './grpcCoreAction'

export const getItemsAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  accountContract,
) => {
  await grpcCoreAction(dispatch, actionNameObj, requestFn, accountContract)
}
