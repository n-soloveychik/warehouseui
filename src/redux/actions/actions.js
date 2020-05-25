import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
  TEMPLATES,
  ERROR,
} from './actionNames'
import { getOrdersAction } from './grpcActions/orderActions'
import {
  getItemsAction,
  updateItemStatusAction,
} from './grpcActions/itemActions'
import { grpc } from '@/grpc/index'
import {
  getVendorTemplatesAction,
  createVendorTemplateAction,
  getItemsByVendorAction,
  getCategoriesAction,
  createCategoryAction,
  createItemAction,
  addItemToVendorAction,
} from './grpcActions/templateAction'

export function getOrders(dispatch) {
  return getOrdersAction(dispatch, GRPC.ORDERS.GET, grpc.orders.get)
}

export function getItemsByVendorCode(dispatch, vendorCode) {
  return getItemsAction(dispatch, GRPC.ITEMS.GET, grpc.items.get, vendorCode)
}

export function updateItemStatus(dispatch, { statusId, itemId }) {
  return updateItemStatusAction(
    dispatch,
    GRPC.ITEMS.UPDATE,
    grpc.items.updateStatus,
    { itemId, statusId },
  )
}

export const selectVendorCode = (dispatch, vendorCode) => {
  dispatch({
    type: SELECT_CURRENT_VENDOR_CODE,
    vendorCode,
  })
  getItemsByVendorCode(dispatch, vendorCode)
}

export const selectOrder = (dispatch, order) => {
  dispatch({
    type: SELECT_CURRENT_ORDER,
    order,
  })
}

export const templateActions = {
  vendor: {
    get: (dispatch) => getVendorTemplatesAction(dispatch),
    create: (dispatch, vendorCode) =>
      createVendorTemplateAction(dispatch, vendorCode),
    addItem: (dispatch, itemId, vendorId) =>
      addItemToVendorAction(dispatch, { itemId, vendorId }),
  },
  vendorPage: {
    showCreateVendor: (dispatch) =>
      dispatch({ type: TEMPLATES.VENDOR_PAGE_SHOW_ADD_VENDOR }),
    hideCreateVendor: (dispatch) =>
      dispatch({ type: TEMPLATES.VENDOR_PAGE_HIDE_ADD_VENDOR }),
  },
  items: {
    getByVendor: (dispatch, vendorId) =>
      getItemsByVendorAction(dispatch, vendorId),
    create: (dispatch, item) => createItemAction(dispatch, item),
    clear: (dispatch) => dispatch({ type: TEMPLATES.VENDOR_PAGE_CLEAR_ITEMS }),
  },
  itemPage: {
    setCurrentVendor: (dispatch, vendorId) => {
      dispatch({ type: TEMPLATES.ITEM_PAGE_SET_CURRENT_VENDOR, vendorId })
    },
    showCategoryCreate: (dispatch) => {
      dispatch({ type: TEMPLATES.ITEM_PAGE_SHOW_CATEGORY_CREATE })
    },
    hideCategoryCreate: (dispatch) => {
      dispatch({ type: TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_CREATE })
    },
    showCategorySelect: (dispatch) => {
      dispatch({ type: TEMPLATES.ITEM_PAGE_SHOW_CATEGORY_SELECT })
    },
    hideCategorySelect: (dispatch) => {
      dispatch({ type: TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_SELECT })
    },
  },
  categories: {
    get: (dispatch) => getCategoriesAction(dispatch),
    create: (dispatch, categoryName) =>
      createCategoryAction(dispatch, categoryName),
  },
  newCategory: {
    add: (dispatch, category) => {
      dispatch({ type: TEMPLATES.ITEM_PAGE_ADD_NEW_CATEGORY, category })
      dispatch({ type: TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_SELECT })
      dispatch({ type: TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_CREATE })
    },
  },
}

export const errorActions = {
  showError: (dispatch, title, text) =>
    dispatch({ type: ERROR.OPEN, title, text }),
  hideError: (dispatch) => dispatch({ type: ERROR.CLOSE }),
}
