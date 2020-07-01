import { TRANSFER, API } from "../actions/actionNames";

const initialState = {
  currentItem: null,
  transferAvailable: [],
  supplement: [],
  loading: false,
  supplementLoading: false,
  historyTransfer: [],
  historyLoading: false,
};

const setCurrentItem = (state, item) => {
  const newState = { ...state };
  newState.currentItem = {
    ...item,
    count_lack: item.count - item.count_in_stock,
    count_transfer: 0,
  };
  return newState;
};

const successGetAvailable = (state, { orders, item }) => {
  const newState = setCurrentItem(state, item);
  return { ...newState, transferAvailable: orders, loading: false };
};

const doTransfer = (state, { order_id, invoice_id, count }) => {
  const newState = { ...state };
  const invoice = newState.transferAvailable
    .find((order) => order.order_id === order_id)
    ?.invoices.find((inv) => inv.invoice_id === invoice_id);
  const item = newState.currentItem;
  const isNeededCount = item.count_lack - item.count_transfer;
  const leftInInvoice = invoice.count_available - (invoice.count_transfer || 0);
  if (count > 0) {
    if (count > isNeededCount) count = isNeededCount;
    if (count > leftInInvoice) count = leftInInvoice;
  } else {
    if (item.count_transfer + count < 0) count = -item.count_transfer;
    if (leftInInvoice + count < 0) count = -leftInInvoice;
  }
  item.count_transfer = (item.count_transfer || 0) + count;
  invoice.count_transfer = (invoice.count_transfer || 0) + count;
  return newState;
};

const resetTransfer = (state) => {
  const newState = { ...state };

  newState.transferAvailable = newState.transferAvailable.map((order) => ({
    ...order,
    invoices: order.invoices.map((invoice) => ({
      ...invoice,
      count_transfer: 0,
    })),
  }));
  newState.currentItem = { ...newState.currentItem, count_transfer: 0 };

  return newState;
};

const obj = {
  [TRANSFER.SET_CURRENT_ITEM]: (state, data) => setCurrentItem(state, data),
  [API.ITEM.TRANSFER.GET_AVAILABLE.CALL]: (state) => ({
    ...state,
    loading: true,
  }),
  [API.ITEM.TRANSFER.GET_AVAILABLE.SUCCESS]: (state, data) => {
    return successGetAvailable(state, data);
  },
  [API.ITEM.TRANSFER.GET_AVAILABLE.FAILURE]: (state, data) => {},
  [API.ITEM.TRANSFER.DO.CALL]: (state, data) => ({
    ...state,
    supplementLoading: true,
  }),
  [API.ITEM.TRANSFER.DO.SUCCESS]: (state) => initialState,
  [API.ITEM.TRANSFER.DO.FAILURE]: (state, data) => ({
    ...state,
    supplementLoading: false,
  }),
  [API.ITEM.TRANSFER.GET_HISTORY.CALL]: (state) => ({
    ...state,
    historyLoading: true,
  }),
  [API.ITEM.TRANSFER.GET_HISTORY.SUCCESS]: (state, data) => ({
    ...state,
    historyLoading: false,
    historyTransfer: data?.transfer_history,
    currentItem: data?.item,
  }),
  [API.ITEM.TRANSFER.GET_HISTORY.FAILURE]: (state) => ({
    ...state,
    historyLoading: false,
  }),
  [TRANSFER.TRANSFER]: (state, data) => doTransfer(state, data),
  [TRANSFER.RESET]: (state) => resetTransfer(state),
  [TRANSFER.RESET_ALL]: () => ({ ...initialState }),
};

export default (state = initialState, action) => {
  return obj.hasOwnProperty(action.type)
    ? obj[action.type](state, action.data)
    : state;
};
