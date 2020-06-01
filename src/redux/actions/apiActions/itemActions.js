import { apiCoreAction } from './apiCoreAction'
import { ERROR } from '../actionNames'

export const getItemsAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  accountContract,
) => {
  await apiCoreAction(dispatch, actionNameObj, requestFn, accountContract)
}

export const itemUpdateStatusAction = async (
  dispatch,
  actionNameObj,
  requestFn,
  itemId,
) => {
  dispatch({ type: actionNameObj.CALL, itemId })
  let response = await requestFn()
  if (response.status === 401) {
    dispatch({ type: response.status, title: response.data?.message })
    return
  }
  if (response.status === 200) {
    dispatch({ type: actionNameObj.SUCCESS, itemId })
    return
  }
  dispatch({
    type: ERROR.OPEN,
    title: response.status,
    text: response.data?.message,
  })
  dispatch({ type: actionNameObj.FAILURE, itemId })
}
