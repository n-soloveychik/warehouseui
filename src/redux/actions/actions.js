import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_INVOICE,
  API,
  // TEMPLATES,
  ERROR,
} from './actionNames'
import { getOrdersAction } from './apiActions/orderActions'
// import {
// getItemsAction,
// updateItemStatusAction,
// } from './apiActions/itemActions'
import { REQUEST } from '@/api/index'
import { login, checkToken } from './apiActions/loginAction'
import { getInvoicesByOrder } from './apiActions/invoiceAction'
// import {
//   getVendorTemplatesAction,
//   createVendorTemplateAction,
//   getItemsByVendorAction,
//   getCategoriesAction,
//   createCategoryAction,
//   createItemAction,
//   addItemToVendorAction,
// } from './apiActions/templateAction'

export function getOrders(dispatch) {
  return getOrdersAction(dispatch, API.ORDERS.GET, REQUEST.getAvailableOrders)
}

// export function getItemsByInvoice(dispatch, invoice) {
//   return getItemsAction(dispatch, API.ITEMS.GET, REQUEST.items.get, invoice)
// }

// export function updateItemStatus(dispatch, { statusId, itemId }) {
//   return updateItemStatusAction(
//     dispatch,
//     API.ITEMS.UPDATE,
//     REQUEST.items.updateStatus,
//     { itemId, statusId },
//   )
// }

export const selectInvoice = (dispatch, invoice) => {
  dispatch({
    type: SELECT_CURRENT_INVOICE,
    invoice: invoice.invoice_code,
  })
  dispatch({
    type: API.ITEMS.SET_BY_INVOICE,
  })
}

export const selectOrder = async (dispatch, order) => {
  dispatch({
    type: SELECT_CURRENT_ORDER,
    order: order.order_num,
  })
  await getInvoicesByOrder(
    dispatch,
    API.INVOICES.GET,
    REQUEST.getInvoicesAndItemsByOrder.bind(null, order.order_id),
  )
}

// export const templateActions = {
//   vendor: {
//     get: (dispatch) => getVendorTemplatesAction(dispatch),
//     create: (dispatch, invoice) =>
//       createVendorTemplateAction(dispatch, invoice),
//     addItem: (dispatch, itemId, vendorId) =>
//       addItemToVendorAction(dispatch, { itemId, vendorId }),
//   },
//   vendorPage: {
//     showCreateVendor: (dispatch) =>
//       dispatch({ type: TEMPLATES.VENDOR_PAGE_SHOW_ADD_VENDOR }),
//     hideCreateVendor: (dispatch) =>
//       dispatch({ type: TEMPLATES.VENDOR_PAGE_HIDE_ADD_VENDOR }),
//   },
//   items: {
//     getByVendor: (dispatch, vendorId) =>
//       getItemsByVendorAction(dispatch, vendorId),
//     create: (dispatch, item) => createItemAction(dispatch, item),
//     clear: (dispatch) => dispatch({ type: TEMPLATES.VENDOR_PAGE_CLEAR_ITEMS }),
//   },
//   itemPage: {
//     setCurrentVendor: (dispatch, vendorId) => {
//       dispatch({ type: TEMPLATES.ITEM_PAGE_SET_CURRENT_VENDOR, vendorId })
//     },
//     showCategoryCreate: (dispatch) => {
//       dispatch({ type: TEMPLATES.ITEM_PAGE_SHOW_CATEGORY_CREATE })
//     },
//     hideCategoryCreate: (dispatch) => {
//       dispatch({ type: TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_CREATE })
//     },
//     showCategorySelect: (dispatch) => {
//       dispatch({ type: TEMPLATES.ITEM_PAGE_SHOW_CATEGORY_SELECT })
//     },
//     hideCategorySelect: (dispatch) => {
//       dispatch({ type: TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_SELECT })
//     },
//   },
//   categories: {
//     get: (dispatch) => getCategoriesAction(dispatch),
//     create: (dispatch, categoryName) =>
//       createCategoryAction(dispatch, categoryName),
//   },
//   newCategory: {
//     add: (dispatch, category) => {
//       dispatch({ type: TEMPLATES.ITEM_PAGE_ADD_NEW_CATEGORY, category })
//       dispatch({ type: TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_SELECT })
//       dispatch({ type: TEMPLATES.ITEM_PAGE_HIDE_CATEGORY_CREATE })
//     },
//   },
// }

export const errorActions = {
  showError: (dispatch, title, text) =>
    dispatch({ type: ERROR.OPEN, title, text }),
  hideError: (dispatch) => dispatch({ type: ERROR.CLOSE }),
}

export const loginActions = {
  login: (dispatch, requestData) => login(dispatch, REQUEST.login, requestData),
  checkToken: (dispatch) => checkToken(dispatch, REQUEST.checkToken),
}
