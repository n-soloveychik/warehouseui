import { grpcCoreAction } from './grpcCoreAction'

export const getAccountContractsAction = async (
  dispatch,
  actionNameObj,
  requestFn,
) => {
  await grpcCoreAction(dispatch, actionNameObj, requestFn)
}
