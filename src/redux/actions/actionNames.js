const api = (method, name) => ({
  CALL: `API_${method}_${name}_CALL`,
  FAILURE: `API_${method}_${name}_FAILURE`,
  SUCCESS: `API_${method}_${name}_SUCCESS`,
})

export const SELECT_CURRENT_ORDER = 'SELECT_CURRENT_ORDER'
export const SELECT_CURRENT_INVOICE = 'SELECT_CURRENT_INVOICE'

export const API = {
  ORDERS: {
    GET: api('GET', 'ORDERS'),
  },
  ITEMS: {
    GET: api('GET', 'ITEMS'),
    UPDATE: api('UPDATE', 'ITEM'),
    SET_BY_INVOICE: 'SET_ITEM_BY_INVOICE',
  },
  INVOICES: {
    GET: api('GET', 'INVOICES'),
  },
  TEMPLATES: {
    VENDORS: {
      GET: api('GET', 'VENDOR_TEMPLATES'),
      CREATE: api('CREATE', 'VENDOR_TEMPLATES'),
      ADD_ITEM: api('ADD_ITEM', 'VENDOR_TEMPLATES'),
    },
    CATEGORIES: {
      GET: api('GET', 'CATEGORIES_TEMPLATES'),
      CREATE: api('CREATE', 'CATEGORY_TEMPLATE'),
    },
    ITEMS: {
      GET_BY_VENDOR: api('GET_BY_VENDOR', 'ITEM_TEMPLATES'),
      GET_BY_CATEGORY: api('GET_BY_CATEGORY', 'ITEM_TEMPLATES'),
      CREATE: api('CREATE', 'ITEM_TEMPLATE'),
    },
  },
}

export const TEMPLATES = {
  VENDOR_PAGE_SHOW_ADD_VENDOR: 'TEMPLATES_VENDOR_PAGE_SHOW_ADD_VENDOR',
  VENDOR_PAGE_HIDE_ADD_VENDOR: 'TEMPLATES_VENDOR_PAGE_HIDE_ADD_VENDOR',
  ITEM_PAGE_SET_CURRENT_VENDOR: 'ITEM_PAGE_SET_CURRENT_VENDOR',
  ITEM_PAGE_SHOW_CATEGORY_CREATE: 'ITEM_PAGE_SHOW_CATEGORY_CREATE',
  ITEM_PAGE_HIDE_CATEGORY_CREATE: 'ITEM_PAGE_HIDE_CATEGORY_CREATE',
  ITEM_PAGE_SHOW_CATEGORY_SELECT: 'ITEM_PAGE_SHOW_CATEGORY_SELECT',
  ITEM_PAGE_HIDE_CATEGORY_SELECT: 'ITEM_PAGE_HIDE_CATEGORY_SELECT',
  ITEM_PAGE_ADD_NEW_CATEGORY: 'ITEM_PAGE_ADD_NEW_CATEGORY',
  VENDOR_PAGE_CLEAR_ITEMS: 'VENDOR_PAGE_CLEAR_ITEMS',
}

export const APP = {
  SET: {
    ORDERS_INVOICES_CURRENT_ORDER_INVOICE:
      'APP_SET_ORDERS_INVOICES_CURRENT_ORDER_INVOICE',
  },
}

export const ERROR = {
  OPEN: 'ERROR_OPEN',
  CLOSE: 'ERROR_CLOSE',
}

export const ROUTER = {
  UNAUTHORIZED: 'ROUTER_UNAUTHORIZED',
  AUTHORIZED: 'ROUTER_AUTHORIZED',
}
