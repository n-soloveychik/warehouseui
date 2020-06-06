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
  data
) => {
  if (!dispatch) return
  dispatch(request(actionNameObj.CALL))
  try {
    const response = await apiRequest(data)
    if (response.status === 401) {
      dispatch(unauthorized)
      return { status: 401 }
    } else {
      dispatch(success(actionNameObj.SUCCESS, response.data))
      return response
    }
  } catch (e) {
    console.log(e)
    dispatch(fail(actionNameObj.FAILURE, e))
  }
}
