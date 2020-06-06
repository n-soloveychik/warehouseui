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

const callMultipleUpdateItemsStatus = (state, itemIds, newStatusId) => {
  const newState = { ...state }
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice
    )?.items || []
  const itemsToUpdate =
    items.filter((item) => itemIds.includes(item.item_id)) || {}
  itemsToUpdate.forEach((item) =>
    Object.assign(item, { loading: true, newStatusId })
  )
  return newState
}

const successMultipleUpdateItemsStatus = (state, resultItems) => {
  const newState = { ...state }
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice
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
      (invoice) => invoice.invoice_id === newState.currentInvoice
    )?.items || []
  const itemsToUpdate =
    items.filter((item) => itemIds.includes(item.item_id)) || {}
  itemsToUpdate.forEach((item) => {
    delete item.loading
    delete item.newStatusId
  })
  return newState
}

const successUpdateCountInStockAndStatus = (state, updateditem) => {
  const newState = { ...state }
  const items = newState.invoices.find(
    (invoice) => invoice.invoice_id === newState.currentInvoice
  )?.items
  if (!items) return state
  const itemIndex = items.findIndex(
    (item) => item.item_id === updateditem.item_id
  )
  if (!~itemIndex) return state
  items[itemIndex] = { ...updateditem }
  return newState
}

const setItemNewCountInStock = (state, itemId, value) => {
  const newState = { ...state }
  const items = newState.invoices.find(
    (invoice) => invoice.invoice_id === newState.currentInvoice
  )?.items
  if (!items) return state
  const itemIndex = items.findIndex((item) => item.item_id === itemId)
  if (!~itemIndex) return state
  const item = items[itemIndex]
  item.new_count_in_stock = value
  if (item.new_count_in_stock > item.count) item.new_count_in_stock = item.count
  if (item.new_count_in_stock < 0) item.new_count_in_stock = 0
  items[itemIndex] = { ...items[itemIndex] }
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
  [API.ITEM.COUNT_IN_STOCK.SET.SUCCESS]: (state, { data }) =>
    successUpdateCountInStockAndStatus(state, data),
  [API.ITEM.COUNT_IN_STOCK.SET.FAILURE]: (state) => state,
  [API.ITEMS.MULTIPLE_SET_STATUS_IN_STOCK.CALL]: (state, { itemIds }) =>
    callMultipleUpdateItemsStatus(state, itemIds, 2),
  [API.ITEMS.MULTIPLE_SET_STATUS_IN_STOCK.SUCCESS]: (state, { resultItems }) =>
    successMultipleUpdateItemsStatus(state, resultItems, 2),
  [API.ITEMS.MULTIPLE_SET_STATUS_IN_STOCK.FAILURE]: (state, { itemIds }) =>
    failureMultipleUpdateItemsStatus(state, itemIds),
  [APP.SET.ORDERS_INVOICES_CURRENT_ORDER_INVOICE]: (
    state,
    { orders, invoices, currentOrder, currentInvoice }
  ) => {
    return {
      ...state,
      orders,
      invoices,
      currentOrder,
      currentInvoice: parseInt(currentInvoice),
    }
  },
  [APP.ITEM.SET_NEW_COUNT_IN_STOCK]: (state, { itemId, value }) =>
    setItemNewCountInStock(state, itemId, value),
  DEFAULT: (state) => ({ ...state }),
}

export default function (state = initialState, action) {
  return obj[action.type] ? obj[action.type](state, action) : obj.DEFAULT(state)
}
