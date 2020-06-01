import { ROUTER } from '../actionNames'

export const login = async (dispatch, requestFn, requestData) => {
  let response = await requestFn(requestData)
  if (response.status === 201) {
    localStorage.setItem('token', response.data.token)
    await dispatch({ type: ROUTER.AUTHORIZED })
  }
}

export const checkToken = async (dispatch, requestFn) => {
  let response = await requestFn()
  if (response.status === 401) {
    localStorage.removeItem('token')
  } else {
  }
}
