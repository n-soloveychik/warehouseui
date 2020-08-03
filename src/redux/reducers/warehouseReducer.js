import { API, APP } from "@/redux/actions/actionNames";

const initialState = {
  orderSearch: "",
  orders: [],
  invoices: [],
  isCallingGetOrders: false,
  isCallingGetItems: false,
  currentOrder: null,
  currentInvoice: null,
};

const selectOrder = (state, orderId) => {
  if (!state.orders.find((order) => order.order_id === orderId))
    return Object.assign({}, state);
  return Object.assign({}, state, {
    currentOrder: orderId,
    currentInvoice:
      state.currentOrder === orderId ? state.currentInvoice : null,
  });
};

const selectInvoice = (state, invoice) => {
  if (
    !state.currentOrder ||
    !state.orders.find((order) => order.order_id === state.currentOrder) ||
    !invoice ||
    !state.orders
      .find((order) => order.order_id === state.currentOrder)
      .invoices?.find((inv) => inv.invoice_id === invoice)
  ) {
    return Object.assign({}, state);
  }
  return Object.assign({}, state, {
    currentInvoice: invoice,
  });
};

const callMultipleUpdateItemsStatus = (state, itemIds) => {
  const newState = { ...state };
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice
    )?.items || [];
  const itemsToUpdate =
    items.filter((item) => itemIds.includes(item.item_id)) || {};
  itemsToUpdate.forEach((item) => Object.assign(item, { loading: true }));
  return newState;
};

const successMultipleUpdateItemsStatus = (state, resultItems) => {
  const newState = { ...state };
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice
    )?.items || [];
  Object.keys(items).forEach((key) => {
    const item = items[key];
    const resultItem = resultItems.find((i) => i.item_id === item.item_id);
    if (!resultItem) return;
    items[key] = { ...resultItem };
  });
  return newState;
};

const failureMultipleUpdateItemsStatus = (state, itemIds) => {
  const newState = { ...state };
  const items =
    newState.invoices.find(
      (invoice) => invoice.invoice_id === newState.currentInvoice
    )?.items || [];
  const itemsToUpdate =
    items.filter((item) => itemIds.includes(item.item_id)) || {};
  itemsToUpdate.forEach((item) => {
    delete item.loading;
    delete item.newStatusId;
  });
  return newState;
};

const updateItem = (state, updateditem) => {
  const newState = { ...state };
  const items = newState.invoices.find(
    (invoice) => invoice.invoice_id === newState.currentInvoice
  )?.items;
  if (!items) return state;
  const itemIndex = items.findIndex(
    (item) => item.item_id === updateditem.item_id
  );
  if (!~itemIndex) return state;
  items[itemIndex] = { ...updateditem };
  return newState;
};

const setItemNewCountInStock = (state, itemId, value) => {
  const newState = { ...state };
  const items = newState.invoices.find(
    (invoice) => invoice.invoice_id === newState.currentInvoice
  )?.items;
  if (!items) return state;
  const itemIndex = items.findIndex((item) => item.item_id === itemId);
  if (!~itemIndex) return state;
  const item = items[itemIndex];
  item.new_count_in_stock = value;
  delete item.new_count_shipment;
  if (item.new_count_in_stock > item.count)
    item.new_count_in_stock = item.count;
  if (item.new_count_in_stock < item.count_shipment)
    item.new_count_in_stock = item.count_shipment;
  items[itemIndex] = { ...items[itemIndex] };
  return newState;
};

const setItemNewCountShipment = (state, itemId, value) => {
  const newState = { ...state };
  const items = newState.invoices.find(
    (invoice) => invoice.invoice_id === newState.currentInvoice
  )?.items;
  if (!items) return state;
  const itemIndex = items.findIndex((item) => item.item_id === itemId);
  if (!~itemIndex) return state;
  const item = items[itemIndex];
  item.new_count_shipment = value;
  delete item.new_count_in_stock;
  if (item.new_count_shipment > item.count_in_stock)
    item.new_count_shipment = item.count_in_stock;
  if (item.new_count_shipment < 0) item.new_count_shipment = 0;
  items[itemIndex] = { ...items[itemIndex] };
  return newState;
};

const setCategoryItemsShipment = (
  state,
  { category_id, invoice_id, items }
) => {
  const newState = { ...state };
  const invoice = newState.invoices.find(
    (invoice) => invoice.invoice_id === invoice_id
  );
  invoice.items = invoice.items.map(
    (item) =>
      items.find((responsedItem) => responsedItem.item_id === item.item_id) ||
      item
  );
  return newState;
};

const obj = {
  [APP.AVAILABLE_ORDER.CURRENT.SELECT]: (state, { order }) =>
    selectOrder(state, order),
  [APP.ORDER.SEARCH.SET]: (state, { searchStr }) => ({
    ...state,
    orderSearch: searchStr,
  }),
  [APP.INVOICE.CURRENT.SELECT]: (state, { invoice }) =>
    selectInvoice(state, invoice),
  [API.AVAILABLE_ORDERS.GET.CALL]: (state) => ({
    ...state,
    isCallingGetOrders: true,
  }),
  [API.AVAILABLE_ORDERS.GET.FAILURE]: (state) => ({
    ...state,
    isCallingGetOrders: false,
  }),
  [API.AVAILABLE_ORDERS.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    isCallingGetOrders: false,
    orders: data,
  }),
  [API.ORDER.DELETE.CALL]: (state) => state,
  [API.ORDER.DELETE.SUCCESS]: (state) => state,
  [API.ORDER.DELETE.FAILURE]: (state) => state,
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
    const newState = { ...state };
    const item = newState.items.find((item) => item.itemId === data.itemId);
    item.statusId = data.statusId;
    return newState;
  },
  [API.ITEMS.CATEGORY.SET_SHIPMENT.SUCCESS]: (state, { data }) =>
    setCategoryItemsShipment(state, data),
  [API.ITEM.COUNT_IN_STOCK.SET.SUCCESS]: (state, { data }) =>
    updateItem(state, data),
  [API.ITEM.COUNT_IN_STOCK.SET.FAILURE]: (state) => state,
  [API.ITEM.COUNT_SHIPMENT.SET.SUCCESS]: (state, { data }) =>
    updateItem(state, data),
  [API.ITEM.COUNT_SHIPMENT.SET.FAILURE]: (state) => state,
  [API.ITEMS.MULTIPLE_SET_FULL_IN_STOCK.CALL]: (state, { itemIds }) =>
    callMultipleUpdateItemsStatus(state, itemIds, 2),
  [API.ITEMS.MULTIPLE_SET_FULL_IN_STOCK.SUCCESS]: (state, { resultItems }) =>
    successMultipleUpdateItemsStatus(state, resultItems, 2),
  [API.ITEMS.MULTIPLE_SET_FULL_IN_STOCK.FAILURE]: (state, { itemIds }) =>
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
    };
  },
  [APP.ITEM.SET_NEW_COUNT_IN_STOCK]: (state, { itemId, value }) =>
    setItemNewCountInStock(state, itemId, value),
  [APP.ITEM.SET_NEW_COUNT_SHIPMENT]: (state, { itemId, value }) =>
    setItemNewCountShipment(state, itemId, value),
};

export default function (state = initialState, action) {
  return obj[action.type] ? obj[action.type](state, action) : state;
}
