import { ROUTER } from "../actionNames";

const request = (actionName) => ({
  type: actionName,
});

const fail = (actionName, error) => ({
  type: actionName,
  error,
});

const success = (actionName, data) => ({
  type: actionName,
  data,
});

const unauthorized = {
  type: ROUTER.UNAUTHORIZED,
};

/**
 * Send request and process respons
 * @param {object} dispatch
 * @param {object} actionNameObj - {CALL, SUCCESS, FAILURE}
 * @param {function} apiRequest - request function without data
 * @param {any} data - data to send
 * @return {promise} response object
 */
export const apiCoreAction = async (
  dispatch,
  actionNameObj,
  apiRequest,
  data
) => {
  if (!dispatch) return;
  dispatch(request(actionNameObj.CALL));
  try {
    const response = await apiRequest(data);
    if (response.status === 401) {
      dispatch(unauthorized);
      return { status: 401 };
    }
    if (response.status > 199 && response.status < 300) {
      dispatch(success(actionNameObj.SUCCESS, response.data));
      return response;
    }
    dispatch(fail(actionNameObj.FAILURE, response.data));
    return response;
  } catch (e) {
    console.log(e);
    dispatch(fail(actionNameObj.FAILURE, e));
  }
};
