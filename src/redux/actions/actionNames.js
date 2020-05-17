const grpc = (method, name) => ({
  CALL: `GRPC_${method}_${name}_CALL`,
  FAILURE: `GRPC_${method}_${name}_FAILURE`,
  SUCCESS: `GRPC_${method}_${name}_SUCCESS`,
})

export const SELECT_CURRENT_ORDER = 'SELECT_CURRENT_ORDER'
export const SELECT_CURRENT_VENDOR_CODE = 'SELECT_CURRENT_VENDOR_CODE'

export const GRPC = {
  ORDERS: {
    GET: grpc('GET', 'ORDERS'),
  },
  ITEMS: {
    GET: grpc('GET', 'ITEMS'),
    UPDATE: grpc('UPDATE', 'ITEM'),
  },
  TEMPLATES: {
    VENDORS: {
      GET: grpc('GET', 'VENDOR_TEMPLATES'),
      CREATE: grpc('CREATE', 'VENDOR_TEMPLATES'),
    },
    CATEGORIES: {
      GET: grpc('GET', 'CATEGORIES_TEMPLATES'),
      CREATE: grpc('CREATE', 'CATEGORY_TEMPLATE'),
    },
    ITEMS: {
      GET_BY_VENDOR: grpc('GET_BY_VENDOR', 'ITEM_TEMPLATES'),
      GET_BY_CATEGORY: grpc('GET_BY_CATEGORY', 'ITEM_TEMPLATES'),
      CREATE: grpc('CREATE', 'ITEM_TEMPLATE'),
      ADD_TO_VENDOR: grpc('ADD_TO_VENDOR', 'ITEM_TEMPLATE'),
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
}
