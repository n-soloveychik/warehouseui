import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_INVOICE,
  API,
  APP,
} from '@/redux/actions/actionNames'

const initialState = {
  orders: [],
  invoices: [],
  isCallingGetOrders: false,
  isCallingGetItems: false,
  currentOrder: null,
  currentInvoice: null,
}

const selectOrder = (state, orderNum) => {
  if (!state.orders.find((order) => order.order_num === orderNum))
    return Object.assign({}, state)
  return Object.assign({}, state, {
    currentOrder: orderNum,
    currentInvoice:
      state.currentOrder === orderNum ? state.currentInvoice : null,
  })
}

const selectInvoice = (state, invoice) => {
  if (
    !state.currentOrder ||
    !state.orders.find((order) => order.order_num === state.currentOrder) ||
    !invoice ||
    !state.orders
      .find((order) => order.order_num === state.currentOrder)
      .invoices?.find((inv) => inv.invoice_id === invoice)
  ) {
    return Object.assign({}, state)
  }
  return Object.assign({}, state, {
    currentInvoice: invoice,
  })
}

const obj = {
  [SELECT_CURRENT_ORDER]: (state, { order }) => selectOrder(state, order),
  [SELECT_CURRENT_INVOICE]: (state, { invoice }) =>
    selectInvoice(state, invoice),
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
  [API.INVOICES.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    invoices: data,
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
  [APP.SET.ORDERS_INVOICES_CURRENT_ORDER_INVOICE]: (
    state,
    { orders, invoices, currentOrder, currentInvoice },
  ) => {
    return {
      ...state,
      orders,
      invoices,
      currentOrder,
      currentInvoice: parseInt(currentInvoice),
    }
  },
  DEFAULT: (state) => ({ ...state }),
}

export default function (state = initialState, action) {
  return obj[action.type] ? obj[action.type](state, action) : obj.DEFAULT(state)
}
