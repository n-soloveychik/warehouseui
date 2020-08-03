import { apiCoreAction } from "./apiCoreAction";
import { API, APP, ERROR, ROUTER } from "../actionNames";
import { REQUEST } from "@/api";
import { getInvoicesByOrderAction } from "./invoiceAction";

export const getOrdersAction = async (dispatch) => {
  await apiCoreAction(
    dispatch,
    API.AVAILABLE_ORDERS.GET,
    REQUEST.getAvailableOrders
  );
};

export const selectOrderAction = async (dispatch, order) => {
  dispatch({
    type: APP.AVAILABLE_ORDER.CURRENT.SELECT,
    order: order.order_id,
  });
  await getInvoicesByOrderAction(dispatch, order.order_id);
};

export const searchSetAction = (dispatch, searchStr) => {
  dispatch({
    type: APP.ORDER.SEARCH.SET,
    searchStr,
  });
};

export const deleteOrderAction = async (dispatch, order_id) => {
  const response = await REQUEST.deleteOrder(order_id);
  if (response.status === 200) {
    await getOrdersAction(dispatch);
    return;
  }
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
