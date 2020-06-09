const HOST_NAME = 'https://warehouseapi.iopk.in'

export const URI = {
  V1: {
    LOGIN: HOST_NAME + '/v1/auth/login',
    CHECK_TOKEN: HOST_NAME + '/v1/auth/check',
    ORDER: {
      AVAILABLE: (warehouseId) =>
        `${HOST_NAME}/v1/warehouse/${warehouseId}/order/available`,
      CREATE: `${HOST_NAME}/v1/order`,
      CLAIMS: (order_id) => `${HOST_NAME}/v1/order/${order_id}/claims`,
      ALL: (warehouseId) =>
        `${HOST_NAME}/v1/warehouse/${warehouseId}/orders-with-claims`,
    },
    INVOICES: {
      GET: (orderId) => `${HOST_NAME}/v1/order/${orderId}/invoices`,
    },
    ITEMS: {
      SET_MULTIPLE: {
        FULL_IN_STOCK: `${HOST_NAME}/v1/items/status-in-stock`,
      },
    },
    ITEM: {
      COUNT_IN_STOCK: {
        SET: (itemId) => `${HOST_NAME}/v1/item/${itemId}/count-in-stock`,
      },
      COUNT_SHIPMENT: {
        SET: (itemId) => `${HOST_NAME}/v1/item/${itemId}/count-shipment`,
      },
      CLAIM: {
        CREATE: (itemId) => `${HOST_NAME}/v1/item/${itemId}/claim`,
        CLOSE: (claimId) => `${HOST_NAME}/v1/claim/${claimId}`,
      },
    },
    PHOTOS: {
      INSERT: `${HOST_NAME}/v1/image/insert`,
    },
    TEMPLATE: {
      INVOICES: {
        GET: `${HOST_NAME}/v1/template/invoices`,
        CREATE: `${HOST_NAME}/v1/template/invoice`,
        ADD_ITEM: (invoiceId, itemId) =>
          `${HOST_NAME}/v1/template/invoice/${invoiceId}/item/${itemId}`,
        REMOVE_ITEM: (invoiceId, itemId) =>
          `${HOST_NAME}/v1/template/invoice/${invoiceId}/item/${itemId}`,
      },
      ITEMS: {
        GET: (invoiceId) =>
          `${HOST_NAME}/v1/template/invoice/${invoiceId}/items`,
        CREATE: `${HOST_NAME}/v1/template/item`,
        CATEGORIES: `${HOST_NAME}/v1/item/categories`,
        GET_OF_CATEGORY: (categoryId) =>
          `${HOST_NAME}/v1/template/items?filter[category_id]=${categoryId}`,
        UPDATE_IMAGE: (itemId) =>
          `${HOST_NAME}/v1/template/item/${itemId}/image`,
        UPDATE_LOT: (invoiceId, itemId) =>
          `${HOST_NAME}/v1/template/invoice/${invoiceId}/item/${itemId}/lot`,
        UPDATE_COUNT: (invoiceId, itemId) =>
          `${HOST_NAME}/v1/template/invoice/${invoiceId}/item/${itemId}/count`,
      },
    },
  },
}
