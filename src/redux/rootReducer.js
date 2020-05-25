import { combineReducers } from 'redux'

import warehouse from './reducers/warehouseReducer'
import templates from './reducers/templatesReducer'
import error from './reducers/errorReducer'

export default combineReducers({
  warehouse,
  templates,
  error,
})
