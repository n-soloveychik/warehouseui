import {
  SELECT_CURRENT_ACCOUNT_CONTRACT,
  SELECT_CURRENT_ARTICLE,
} from './actionNames'

export const selectAccountContract = (id) => ({
  type: SELECT_CURRENT_ACCOUNT_CONTRACT,
  payload: id,
})

export const selectArticule = (id) => ({
  type: SELECT_CURRENT_ARTICLE,
  payload: id,
})
