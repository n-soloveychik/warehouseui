import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_VENDOR_CODE,
  API,
} from '@/redux/actions/actionNames'

const initialState = {
  orders: [],
  items: [],
  isCallingGetOrders: false,
  isCallingGetItems: false,
  currentOrder: null,
  currentVendorCode: null,
}

const selectOrder = (state, orderNum) => {
  if (!state.orders.find((order) => order.order_num === orderNum))
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
    !state.orders.find((order) => order.orderNum === state.currentOrder) ||
    !vendorCode ||
    !state.orders.find((order) => order.vendorCode === vendorCode)
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
  [API.ORDERS.GET.CALL]: (state) => ({ ...state, isCallingGetOrders: true }),
  [API.ORDERS.GET.FAILURE]: (state) => ({
    ...state,
    isCallingGetOrders: false,
  }),
  [API.ORDERS.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    isCallingGetOrders: false,
    orders: data,
  }),
  [API.ITEMS.GET.CALL]: (state) => ({ ...state, isCallingGetItems: true }),
  [API.ITEMS.GET.FAILURE]: (state) => ({ ...state, isCallingGetItems: false }),
  [API.ITEMS.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    isCallingGetItems: false,
    items: data,
  }),
  [API.ITEMS.UPDATE.CALL]: (state) => ({ ...state }),
  [API.ITEMS.UPDATE.FAILURE]: (state) => ({ ...state }),
  [API.ITEMS.UPDATE.SUCCESS]: (state, { data }) => {
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
