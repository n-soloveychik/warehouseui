const grpc = (method, name) => ({
  CALL: `GRPC_${method}_${name}_CALL`,
  FAILURE: `GRPC_${method}_${name}_FAILURE`,
  SUCCESS: `GRPC_${method}_${name}_SUCCESS`,
})

export const SELECT_CURRENT_ACCOUNT_CONTRACT = 'SELECT_CURRENT_ACCOUNT_CONTRACT'
export const SELECT_CURRENT_VENDOR_CODE = 'SELECT_CURRENT_VENDOR_CODE'

export const GRPC = {
  ACCOUNT_CONTRACT: {
    GET: grpc('GET', 'ACCOUNT_CONTRACTS'),
  },
}
