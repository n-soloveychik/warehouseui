import { apiCoreAction } from './apiCoreAction'
import { API, ROUTER, APP } from '../actionNames'
import { REQUEST } from '@/api'

export const getClaimsOrdersAction = async (dispatch) => {
  const response = await apiCoreAction(
    dispatch,
    API.CLAIMS_ORDERS.GET,
    REQUEST.getClaimsOrders
  )
  if (response?.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED })
  }
}

export const selectClaimsOrdersCurrentAction = (dispatch, orderId) => {
  dispatch({ type: APP.CLAIMS_ORDERS.CURRENT.SELECT, orderId })
}

export const getClaimsAction = async (dispatch, orderId) => {
  const response = await apiCoreAction(
    dispatch,
    API.CLAIMS.GET,
    REQUEST.getOrderClaims.bind(null, orderId)
  )
  if (response?.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED })
  }
}

export const closeClaimAction = async (dispatch, orderId) => {
  const response = await apiCoreAction(
    dispatch,
    API.CLAIM.CLOSE,
    REQUEST.closeClaim.bind(null, orderId)
  )
  if (response?.status === 401) {
    dispatch({ type: ROUTER.UNAUTHORIZED })
  }
}
