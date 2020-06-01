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

const callUpdateItemStatus = (state, itemId, newStatusId) => {
  const newState = { ...state }
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice,
    )?.items || []
  const item = items.find((item) => item.item_id === itemId) || {}
  Object.assign(item, { loading: true, newStatusId })
  return newState
}

const successUpdateItemStatus = (state, itemId, newStatusId) => {
  const newState = { ...state }
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice,
    )?.items || []
  const item = items.find((item) => item.item_id === itemId) || {}
  delete item.loading
  item.status_id = newStatusId
  delete item.newStatusId
  return newState
}

const failureUpdateItemStatus = (state, itemId, newStatusId) => {
  const newState = { ...state }
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice,
    )?.items || []
  const item = items.find((item) => item.item_id === itemId) || {}
  delete item.loading
  delete item.newStatusId
  return newState
}

const callMultipleUpdateItemsStatus = (state, itemIds, newStatusId) => {
  const newState = { ...state }
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice,
    )?.items || []
  const itemsToUpdate =
    items.filter((item) => itemIds.includes(item.item_id)) || {}
  itemsToUpdate.forEach((item) =>
    Object.assign(item, { loading: true, newStatusId }),
  )
  return newState
}

const successMultipleUpdateItemsStatus = (state, resultItems) => {
  const newState = { ...state }
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice,
    )?.items || []
  items.forEach((item) => {
    const resultItem = resultItems.find((i) => i.item_id === item.item_id)
    if (!resultItem) return
    item.status_id = resultItem.status_id
    delete item.loading
    delete item.newStatusId
  })
  return newState
}

const failureMultipleUpdateItemsStatus = (state, itemIds) => {
  const newState = { ...state }
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice,
    )?.items || []
  const itemsToUpdate =
    items.filter((item) => itemIds.includes(item.item_id)) || {}
  itemsToUpdate.forEach((item) => {
    delete item.loading
    delete item.newStatusId
  })
  return newState
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
  [API.ITEM.SET_STATUS_IN_STOCK.CALL]: (state, { itemId }) =>
    callUpdateItemStatus(state, itemId, 2),
  [API.ITEM.SET_STATUS_IN_STOCK.SUCCESS]: (state, { itemId }) =>
    successUpdateItemStatus(state, itemId, 2),
  [API.ITEM.SET_STATUS_IN_STOCK.FAILURE]: (state, { itemId }) =>
    failureUpdateItemStatus(state, itemId, 2),
  [API.ITEM.SET_STATUS_AWAIT_DELIVERY.CALL]: (state, { itemId }) =>
    callUpdateItemStatus(state, itemId, 1),
  [API.ITEM.SET_STATUS_AWAIT_DELIVERY.SUCCESS]: (state, { itemId }) =>
    successUpdateItemStatus(state, itemId, 1),
  [API.ITEM.SET_STATUS_AWAIT_DELIVERY.FAILURE]: (state, { itemId }) =>
    failureUpdateItemStatus(state, itemId, 1),
  [API.ITEMS.MULTIPLE_SET_STATUS_IN_STOCK.CALL]: (state, { itemIds }) =>
    callMultipleUpdateItemsStatus(state, itemIds, 2),
  [API.ITEMS.MULTIPLE_SET_STATUS_IN_STOCK.SUCCESS]: (state, { resultItems }) =>
    successMultipleUpdateItemsStatus(state, resultItems, 2),
  [API.ITEMS.MULTIPLE_SET_STATUS_IN_STOCK.FAILURE]: (state, { itemIds }) =>
    failureMultipleUpdateItemsStatus(state, itemIds),
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
