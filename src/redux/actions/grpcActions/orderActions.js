import { grpcCoreAction } from './grpcCoreAction'

export const getOrdersAction = async (dispatch, actionNameObj, requestFn) => {
  await grpcCoreAction(dispatch, actionNameObj, requestFn)
}
