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
  },
}
