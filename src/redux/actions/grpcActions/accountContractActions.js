import { grpcCoreAction } from './grpcCoreAction'
import grpc from '@/grpc/index'

export const getAccountContractsAction = (
  dispatch,
  actionNameObj,
  requestFn,
) => {
  grpcCoreAction(dispatch, actionNameObj, requestFn)
}
