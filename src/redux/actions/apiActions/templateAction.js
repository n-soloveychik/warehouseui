import { api } from '@/api'
import { API } from '../actionNames'
import { apiCoreAction } from './spiCoreAction'

export const getVendorTemplatesAction = async (dispatch) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.VENDORS.GET,
    api.template.vendor.get,
  )
}

export const createVendorTemplateAction = async (dispatch, vendorCode) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.VENDORS.CREATE,
    api.template.vendor.create,
    vendorCode,
  )
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.VENDORS.GET,
    api.template.vendor.get,
  )
}

export const getItemsByVendorAction = async (dispatch, vendorId) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.ITEMS.GET_BY_VENDOR,
    api.template.item.getByVendor,
    vendorId,
  )
}

export const getCategoriesAction = async (dispatch) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.CATEGORIES.GET,
    api.template.category.get,
  )
}

export const createCategoryAction = async (dispatch, categoryName) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.CATEGORIES.CREATE,
    api.template.category.create,
    categoryName,
  )
}

export const createItemAction = async (dispatch, item) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.ITEMS.CREATE,
    api.template.item.create,
    item,
  )
}

export const addItemToVendorAction = async (dispatch, { itemId, vendorId }) => {
  await apiCoreAction(
    dispatch,
    API.TEMPLATES.VENDORS.ADD_ITEM,
    api.template.vendor.addItem,
    { itemId, vendorId },
  )
}
