import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_INVOICE,
  API,
  TEMPLATES,
  ERROR,
} from './actionNames'
import { getOrdersAction } from './apiActions/orderActions'
import { REQUEST } from '@/api/index'
import { login, checkToken } from './apiActions/loginAction'
import { getInvoicesByOrderAction } from './apiActions/invoiceAction'
import { setCurrentOrderInvoiceAction } from './apiActions/appAction'
import {
  getInvoiceTemplatesAction,
  createInvoiceTemplateAction,
  getItemsByInvoiceAction,
  getCategoriesAction,
  createCategoryAction,
  createItemAction,
} from './apiActions/templateAction'

export function getOrders(dispatch) {
  return getOrdersAction(dispatch, API.ORDERS.GET, REQUEST.getAvailableOrders)
}

export const selectInvoice = (dispatch, invoice) => {
  dispatch({
    type: SELECT_CURRENT_INVOICE,
    invoice: invoice.invoice_id,
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
  await getInvoicesByOrderAction(
    dispatch,
    API.INVOICES.GET,
    REQUEST.getInvoicesAndItemsByOrder.bind(null, order.order_id),
  )
}

export const getInvoicesByOrder = (dispatch, orderId) =>
  getInvoicesByOrderAction(
    dispatch,
    API.INVOICES.GET,
    REQUEST.getInvoicesAndItemsByOrder.bind(null, orderId),
  )

export const setCurrentParams = (dispatch, order_num, invoice_id) => {
  setCurrentOrderInvoiceAction(dispatch, order_num, invoice_id)
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
