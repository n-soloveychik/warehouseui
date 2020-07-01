import { REQUEST } from "@/api/index";
import { apiCoreAction } from "./apiCoreAction";
import { API, ROUTER, ERROR } from "../actionNames";

export const getAvailableTransferAction = async (dispatch, item_id) => {
  const response = await apiCoreAction(
    dispatch,
    API.ITEM.TRANSFER.GET_AVAILABLE,
    REQUEST.getAvailableTransfer,
    item_id
  );
  if (response.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED });
    return;
  }
  if (response.status !== 200) {
    dispatch({
      type: ERROR.OPEN,
      title: response.status,
      text: response.data?.message,
    });
  }
};

export const supplementItemAction = async (
  dispatch,
  item_id,
  transferAvailable
) => {
  const data = { orders: [] };
  transferAvailable.forEach(({ order_id, invoices }) =>
    invoices.forEach(({ invoice_code, count_transfer }) => {
      if (count_transfer > 0) {
        let currentOrder = data.orders.find(
          (order) => order.order_id === order_id
        );
        if (currentOrder) {
          currentOrder.invoices.push({ invoice_code, count: count_transfer });
        } else {
          data.orders.push({
            order_id,
            invoices: [{ invoice_code, count: count_transfer }],
          });
        }
      }
    })
  );
  const response = await apiCoreAction(
    dispatch,
    API.ITEM.TRANSFER.DO,
    REQUEST.supplementItem.bind(null, item_id),
    data
  );
  if (response.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED });
    return false;
  }
  if (response.status !== 200) {
    dispatch({
      type: ERROR.OPEN,
      title: response.status,
      text: response.data?.message,
    });
    return false;
  }
  return true;
};

export const getItemTransferHistoryAction = async (dispatch, item_id) => {
  const response = await apiCoreAction(
    dispatch,
    API.ITEM.TRANSFER.GET_HISTORY,
    REQUEST.getItemTransferHistory,
    item_id
  );
  if (response.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED });
  }
  if (response.status !== 200) {
    dispatch({
      type: ERROR.OPEN,
      title: response.status,
      text: response.data?.message,
    });
  }
};
