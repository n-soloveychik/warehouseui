import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_INVOICE,
  API,
  TEMPLATES,
  ERROR,
} from './actionNames'
import { getOrdersAction, selectOrderAction } from './apiActions/orderActions'
import { REQUEST } from '@/api/index'
import { login, checkToken } from './apiActions/loginAction'
import {
  getInvoicesByOrderAction,
  selectInvoiceAction,
} from './apiActions/invoiceAction'
import { setCurrentOrderInvoiceAction } from './apiActions/appAction'
import {
  getInvoiceTemplatesAction,
  createInvoiceTemplateAction,
  getItemsByInvoiceAction,
  getCategoriesAction,
  createCategoryAction,
  createItemAction,
  updateItemImageAction,
} from './apiActions/templateAction'
import { itemUpdateStatusAction } from './apiActions/itemActions'

export const warehouseActions = {
  orders: {
    get: (dispatch) => getOrdersAction(dispatch),
    select: async (dispatch, order) => selectOrderAction(dispatch, order),
  },
  invoices: {
    select: (dispatch, invoice) => selectInvoiceAction(dispatch, invoice),
    get: (dispatch, orderId) => getInvoicesByOrderAction(dispatch, orderId),
  },
  uriParams: {
    set: (dispatch, order_num, invoice_id) => {
      setCurrentOrderInvoiceAction(dispatch, order_num, invoice_id)
    },
  },
  items: {
    status: {
      setInStock: (dispatch) => itemUpdateStatusAction(),
      setAwaitDelivery: (dispatch) => itemUpdateStatusAction(),
    },
  },
}

export const templateActions = {
  invoices: {
    get: (dispatch) => getInvoiceTemplatesAction(dispatch),
    create: (dispatch, invoice) =>
      createInvoiceTemplateAction(dispatch, invoice),
  },
  invoicePage: {
    showCreateInvoice: (dispatch) =>
      dispatch({ type: TEMPLATES.INVOICE_PAGE_SHOW_ADD_INVOICE }),
    hideCreateInvoice: (dispatch) =>
      dispatch({ type: TEMPLATES.INVOICE_PAGE_HIDE_ADD_INVOICE }),
  },
  items: {
    getByInvoice: (dispatch, invoiceId) =>
      getItemsByInvoiceAction(dispatch, invoiceId),
    create: (dispatch, item) => createItemAction(dispatch, item),
    clear: (dispatch) => dispatch({ type: TEMPLATES.INVOICE_PAGE_CLEAR_ITEMS }),
    updateImage: (dispatch, { invoiceId, itemId, image }) =>
      updateItemImageAction(dispatch, { invoiceId, itemId, image }),
  },
  itemPage: {
    setCurrentInvoice: (dispatch, invoiceId) => {
      dispatch({ type: TEMPLATES.ITEM_PAGE_SET_CURRENT_INVOICE, invoiceId })
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

export const loginActions = {
  login: (dispatch, requestData) => login(dispatch, REQUEST.login, requestData),
  checkToken: (dispatch) => checkToken(dispatch, REQUEST.checkToken),
}
