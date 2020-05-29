const HOST_NAME = 'https://warehouseapi.iopk.in'

export const URI = {
  V1: {
    LOGIN: HOST_NAME + '/v1/auth/login',
    CHECK_TOKEN: HOST_NAME + '/v1/auth/check',
    ORDER: {
      AVAILABLE: (warehouseId) =>
        `${HOST_NAME}/v1/warehouse/${warehouseId}/order/available`,
    },
    INVOICES: {
      GET: (orderId) => `${HOST_NAME}/v1/order/${orderId}/invoices`,
    },
    ITEM: {
      SET_STATUS: {
        IN_STOCK: (itemId) => `${HOST_NAME}/v1/item/${itemId}/status-in-stock`,
        AWAIT_DELIVERY: (itemId) =>
          `${HOST_NAME}/v1/item/${itemId}/status-await-delivery`,
      },
      CLAIM: {
        CREATE: (itemId) => `${HOST_NAME}/v1/item/${itemId}/create-claim`,
      },
    },
    PHOTOS: {
      INSERT: `${HOST_NAME}/v1/image/insert`,
    },
    TEMPLATE: {
      INVOICES: {
        GET: `${HOST_NAME}/v1/template/invoices`,
        CREATE: `${HOST_NAME}/v1/template/invoice/create`,
      },
    },
  },
}
