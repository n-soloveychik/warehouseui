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

export const getItemsByVendorAction = async (dispatch, vendorId) => {
  await grpcCoreAction(
    dispatch,
    GRPC.TEMPLATES.ITEMS.GET_BY_VENDOR,
    grpc.template.item.getByVendor,
    vendorId,
  )
}

export const getCategoriesAction = async (dispatch) => {
  await grpcCoreAction(
    dispatch,
    GRPC.TEMPLATES.CATEGORIES.GET,
    grpc.template.category.get,
  )
}

export const createCategoryAction = async (dispatch, categoryName) => {
  await grpcCoreAction(
    dispatch,
    GRPC.TEMPLATES.CATEGORIES.CREATE,
    grpc.template.category.create,
    categoryName,
  )
}

export const createItemAction = async (dispatch, item) => {
  await grpcCoreAction(
    dispatch,
    GRPC.TEMPLATES.ITEMS.CREATE,
    grpc.template.item.create,
    item,
  )
}

export const addItemToVendorAction = async (dispatch, { itemId, vendorId }) => {
  await grpcCoreAction(
    dispatch,
    GRPC.TEMPLATES.VENDORS.ADD_ITEM,
    grpc.template.vendor.addItem,
    { itemId, vendorId },
  )
}
