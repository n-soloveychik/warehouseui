import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
} from '@/redux/actions/actionNames'

const initialState = {
  vendorCodes: [],
  items: [],
  isCallingGetOrders: false,
  isCallingGetItems: false,
  currentOrder: null,
  currentVendorCode: null,
}

const selectOrder = (state, orderNum) => {
  if (!state.vendorCodes.find((vendor) => vendor.orderNum === orderNum))
    return Object.assign({}, state)
  return Object.assign({}, state, {
    currentOrder: orderNum,
    currentVendorCode:
      state.currentOrder === orderNum ? state.currentVendorCode : null,
  })
}

const selectVendorCode = (state, vendorCode) => {
  if (
    !state.currentOrder ||
    !state.vendorCodes.find(
      (vendor) => vendor.orderNum === state.currentOrder,
    ) ||
    !vendorCode ||
    !state.vendorCodes.find((vendor) => vendor.vendorCode === vendorCode)
  ) {
    return Object.assign({}, state)
  }
  return Object.assign({}, state, {
    currentVendorCode: vendorCode,
  })
}

const obj = {
  [SELECT_CURRENT_ORDER]: (state, { order }) => selectOrder(state, order),
  [SELECT_CURRENT_VENDOR_CODE]: (state, { vendorCode }) =>
    selectVendorCode(state, vendorCode),
  [GRPC.ORDERS.GET.CALL]: (state) => ({ ...state, isCallingGetOrders: true }),
  [GRPC.ORDERS.GET.FAILURE]: (state) => ({
    ...state,
    isCallingGetOrders: false,
  }),
  [GRPC.ORDERS.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    isCallingGetOrders: false,
    vendorCodes: data,
  }),
  [GRPC.ITEMS.GET.CALL]: (state) => ({ ...state, isCallingGetItems: true }),
  [GRPC.ITEMS.GET.FAILURE]: (state) => ({ ...state, isCallingGetItems: false }),
  [GRPC.ITEMS.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    isCallingGetItems: false,
    items: data,
  }),
  [GRPC.ITEMS.UPDATE.CALL]: (state) => ({ ...state }),
  [GRPC.ITEMS.UPDATE.FAILURE]: (state) => ({ ...state }),
  [GRPC.ITEMS.UPDATE.SUCCESS]: (state, { data }) => {
    const newState = { ...state }
    const item = newState.items.find((item) => item.itemId === data.itemId)
    item.statusId = data.statusId
    return newState
  },
  DEFAULT: (state) => ({ ...state }),
}

export default function (state = initialState, action) {
  return obj[action.type] ? obj[action.type](state, action) : obj.DEFAULT(state)
}
