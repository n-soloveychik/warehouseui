import { TEMPLATES, ERROR } from './actionNames'
import { getOrdersAction, selectOrderAction } from './modules/orderActions'
import { REQUEST } from '@/api/index'
import { login, checkToken } from './modules/loginAction'
import {
  getInvoicesByOrderAction,
  selectInvoiceAction,
} from './modules/invoiceAction'
import { setCurrentOrderInvoiceAction } from './modules/appAction'
import {
  getInvoiceTemplatesAction,
  createInvoiceTemplateAction,
  getItemsByInvoiceAction,
  getCategoriesAction,
  createCategoryAction,
  createItemAction,
  updateItemImageAction,
  updateFieldAction,
} from './modules/templateAction'
import {
  setItemNewCountInStockAction,
  setItemCountInStockAction,
  itemsMultipleUpdateStatusAction,
} from './modules/itemActions'

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
  item: {
    countInStock: {
      set: (dispatch, itemId, countInStock) =>
        setItemCountInStockAction(dispatch, itemId, countInStock),
    },
    newCountInStock: {
      set: (dispatch, itemId, newCountInStock) =>
        setItemNewCountInStockAction(dispatch, itemId, newCountInStock),
    },
  },
  items: {
    setMultipleFullInStocks: (dispatch, itemIds) =>
      itemsMultipleUpdateStatusAction(dispatch, itemIds),
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
    updateField: (dispatch, { field, itemId, invoiceId, newValue }) =>
      updateFieldAction(dispatch, {
        field,
        itemId,
        invoiceId,
        newValue,
      }),
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
