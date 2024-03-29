import { apiCoreAction } from "./apiCoreAction";
import { ERROR, APP, API, ROUTER } from "../actionNames";
import { REQUEST } from "@/api";

export const getItemsAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  accountContract
) => {
  await apiCoreAction(dispatch, actionNameObj, requestFn, accountContract);
};

export const itemUpdateStatusAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  itemId
) => {
  dispatch({ type: actionNameObj.CALL, itemId });
  let response = await requestFn();
  if (response.status === 401) {
    dispatch({ type: response.status, title: response.data?.message });
    return;
  }
  if (response.status === 200) {
    dispatch({ type: actionNameObj.SUCCESS, itemId });
    return;
  }
  dispatch({
    type: ERROR.OPEN,
    title: response.status,
    text: response.data?.message,
  });
  dispatch({ type: actionNameObj.FAILURE, itemId });
};

export const itemsMultipleUpdateStatusAction = async (dispatch, itemIds) => {
  const actionNameObj = API.ITEMS.MULTIPLE_SET_FULL_IN_STOCK;
  const requestFn = REQUEST.setMultipleItemsFullInStock;
  dispatch({ type: actionNameObj.CALL, itemIds });
  let response = await requestFn({ item_ids: itemIds });
  if (response.status === 401) {
    dispatch({ type: response.status, title: response.data?.message });
    return;
  }
  if (response.status === 200) {
    dispatch({ type: actionNameObj.SUCCESS, resultItems: response.data });
    return;
  }
  dispatch({
    type: ERROR.OPEN,
    title: response.status,
    text: response.data?.message,
  });
  dispatch({ type: actionNameObj.FAILURE, itemIds });
};

export const setItemNewCountInStockAction = (dispatch, itemId, value) => {
  dispatch({ type: APP.ITEM.SET_NEW_COUNT_IN_STOCK, itemId, value });
};

export const setItemCountInStockAction = async (
  dispatch,
  itemId,
  count_in_stock
) => {
  const response = await apiCoreAction(
    dispatch,
    API.ITEM.COUNT_IN_STOCK.SET,
    REQUEST.setItemCountInStock.bind(null, itemId),
    { count_in_stock }
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
export const setItemNewCountShipmentAction = (dispatch, itemId, value) => {
  dispatch({ type: APP.ITEM.SET_NEW_COUNT_SHIPMENT, itemId, value });
};

export const setItemCountShipmentAction = async (
  dispatch,
  itemId,
  count_shipment
) => {
  const response = await apiCoreAction(
    dispatch,
    API.ITEM.COUNT_SHIPMENT.SET,
    REQUEST.setItemCountShipment.bind(null, itemId),
    { count_shipment }
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

export const itemCategorySetShipmentAction = async (
  dispatch,
  { invoice_id, category_id }
) => {
  const params = { invoice_id, category_id };
  const response = await apiCoreAction(
    dispatch,
    API.ITEMS.CATEGORY.SET_SHIPMENT,
    REQUEST.setItemCategoryShipment.bind(null, params)
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
