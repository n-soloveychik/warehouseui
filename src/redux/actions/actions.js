import {
  TOGGLE_CURRENT_ACCOUNT_CONTRACT,
  TOGGLE_CURRENT_ARTICLE,
} from './actionNames'

export const toggleAccountContract = (id) => ({
  type: TOGGLE_CURRENT_ACCOUNT_CONTRACT,
  payload: id,
})

export const toggleArticle = (id) => ({
  type: TOGGLE_CURRENT_ARTICLE,
  payload: id,
})
