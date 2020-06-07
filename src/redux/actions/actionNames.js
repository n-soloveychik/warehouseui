const api = (method, name) => ({
  CALL: `API_${method}_${name}_CALL`,
  FAILURE: `API_${method}_${name}_FAILURE`,
  SUCCESS: `API_${method}_${name}_SUCCESS`,
})

export const API = {
  AVAILABLE_ORDERS: {
    GET: api('GET', 'AVAILABLE_ORDERS'),
  },
  CLAIMS_ORDERS: {
    GET: api('GET', 'CLAIMS_ORDERS'),
  },
  CLAIMS: {
    GET: api('GET', 'CLAIMS'),
  },
  CLAIM: {
    CLOSE: api('CLOSE', 'CLAIM'),
  },
  ITEMS: {
    GET: api('GET', 'ITEMS'),
    UPDATE: api('UPDATE', 'ITEM'),
    SET_BY_INVOICE: 'SET_ITEM_BY_INVOICE',
    MULTIPLE_SET_FULL_IN_STOCK: api('MULTIPLE_SET_FULL_IN_STOCK', 'ITEMS'),
  },
  ITEM: {
    COUNT_IN_STOCK: {
      SET: api('SET', 'ITEM_COUNT_IN_STOCK'),
    },
  },
  INVOICES: {
    GET: api('GET', 'INVOICES'),
  },
  TEMPLATES: {
    INVOICES: {
      GET: api('GET', 'INVOICE_TEMPLATES'),
      CREATE: api('CREATE', 'INVOICE_TEMPLATES'),
      ADD_ITEM: api('ADD_ITEM', 'INVOICE_TEMPLATES'),
    },
    CATEGORIES: {
      GET: api('GET', 'CATEGORIES_TEMPLATES'),
      CREATE: api('CREATE', 'CATEGORY_TEMPLATE'),
    },
    ITEMS: {
      GET_BY_INVOICE: api('GET_BY_INVOICE', 'ITEM_TEMPLATES'),
      GET_BY_CATEGORY: api('GET_BY_CATEGORY', 'ITEM_TEMPLATES'),
      CREATE: api('CREATE', 'ITEM_TEMPLATE'),
      UPDATE_FIELD: api('UPDATE_FIELD', 'ITEM_TEMPLATE'),
    },
  },
}

export const TEMPLATES = {
  INVOICE_PAGE_SHOW_ADD_INVOICE: 'TEMPLATES_INVOICE_PAGE_SHOW_ADD_INVOICE',
  INVOICE_PAGE_HIDE_ADD_INVOICE: 'TEMPLATES_INVOICE_PAGE_HIDE_ADD_INVOICE',
  ITEM_PAGE_SET_CURRENT_INVOICE: 'ITEM_PAGE_SET_CURRENT_INVOICE',
  ITEM_PAGE_SHOW_CATEGORY_CREATE: 'ITEM_PAGE_SHOW_CATEGORY_CREATE',
  ITEM_PAGE_HIDE_CATEGORY_CREATE: 'ITEM_PAGE_HIDE_CATEGORY_CREATE',
  ITEM_PAGE_SHOW_CATEGORY_SELECT: 'ITEM_PAGE_SHOW_CATEGORY_SELECT',
  ITEM_PAGE_HIDE_CATEGORY_SELECT: 'ITEM_PAGE_HIDE_CATEGORY_SELECT',
  ITEM_PAGE_ADD_NEW_CATEGORY: 'ITEM_PAGE_ADD_NEW_CATEGORY',
  INVOICE_PAGE_CLEAR_ITEMS: 'INVOICE_PAGE_CLEAR_ITEMS',
}

export const APP = {
  SET: {
    ORDERS_INVOICES_CURRENT_ORDER_INVOICE:
      'APP_SET_ORDERS_INVOICES_CURRENT_ORDER_INVOICE',
  },
  ITEM: {
    SET_NEW_COUNT_IN_STOCK: 'APP_ITEM_SET_NEW_COUNT_IN_STOCK',
  },
  INVOICE: {
    CURRENT: {
      SELECT: 'APP_INVOICE_CURRENT_SELECT',
    },
  },
  AVAILABLE_ORDER: {
    CURRENT: {
      SELECT: 'APP_AVAILABLE_ORDER_CURRENT_SELECT',
    },
  },
  CLAIMS_ORDERS: {
    CURRENT: {
      SELECT: 'APP_CLAIMS_ORDERS_CURRENT_SELECT',
    },
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
