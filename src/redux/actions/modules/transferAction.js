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
