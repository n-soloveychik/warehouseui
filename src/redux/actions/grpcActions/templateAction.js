import { grpc } from '@/grpc'
import { GRPC } from '../actionNames'
import { grpcCoreAction } from './grpcCoreAction'

export const getVendorTemplatesAction = async (dispatch) => {
  await grpcCoreAction(
    dispatch,
    GRPC.TEMPLATES.VENDORS.GET,
    grpc.template.vendor.get,
  )
}

export const createVendorTemplateAction = async (dispatch, vendorCode) => {
  await grpcCoreAction(
    dispatch,
    GRPC.TEMPLATES.VENDORS.CREATE,
    grpc.template.vendor.create,
    vendorCode,
  )
  await grpcCoreAction(
    dispatch,
    GRPC.TEMPLATES.VENDORS.GET,
    grpc.template.vendor.get,
  )
}

export const 
