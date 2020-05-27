import { ROUTER } from '../actionNames'

const request = (actionName) => ({
  type: actionName,
})

const fail = (actionName, error) => ({
  type: actionName,
  error,
})

const success = (actionName, data) => ({
  type: actionName,
  data,
})

const unauthorized = {
  type: ROUTER.UNAUTHORIZED,
}

export const apiCoreAction = async (
  dispatch,
  actionNameObj,
  apiRequest,
  data,
) => {
  if (!dispatch) return
  dispatch(request(actionNameObj.CALL))
  try {
    const responseData = await apiRequest(data)
    if (responseData.status === 401) {
      dispatch(unauthorized)
      return null
    } else {
      dispatch(success(actionNameObj.SUCCESS, responseData))
      return responseData
    }
  } catch (e) {
    dispatch(fail(actionNameObj.FAILURE, e))
  }
}
