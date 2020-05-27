const HOST_NAME = 'https://warehouseapi.iopk.in'

export const URI = {
  V1: {
    LOGIN: HOST_NAME + '/v1/auth/login',
    CHECK_TOKEN: HOST_NAME + '/v1/auth/check',
    ORDER: {
      AVAILABLE: (warehouseId) =>
        `${HOST_NAME}/v1/order/available?warehouse_id=${warehouseId}`,
    },
    INVOICES: {
      GET: (orderId) =>
        `https://warehouseapi.iopk.in/v1/order/${orderId}/invoices`,
    },
  },
}
