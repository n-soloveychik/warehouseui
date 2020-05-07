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

export const grpcCoreAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  requestArgs,
) => {
  if (!dispatch) return
  dispatch(request(actionNameObj.CALL))
  try {
    const responseData = await requestFn(requestArgs)
    dispatch(success(actionNameObj.SUCCESS, responseData))
  } catch (e) {
    dispatch(fail(actionNameObj.FAILURE, e))
  }
}
