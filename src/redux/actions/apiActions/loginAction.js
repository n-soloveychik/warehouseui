import { apiCoreAction } from './apiCoreAction'
import { ERROR, ROUTER } from '../actionNames'

export const login = async (dispatch, requestFn, requestData) => {
  let response = await requestFn(requestData)
  if (response.status !== 201) {
    dispatch({
      type: ERROR.OPEN,
      title: response.status,
      text: response.message,
    })
  } else {
    localStorage.setItem('token', response.token)
    dispatch({ type: ROUTER.AUTHORIZED })
  }
}

export const checkToken = async (dispatch, requestFn) => {
  let response = await requestFn()
  if (response.status === 401) {
    localStorage.removeItem('token')
  } else {
  }
}
