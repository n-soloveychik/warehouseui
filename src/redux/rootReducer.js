import { combineReducers } from 'redux'

import warehouse from './reducers/warehouseReducer'
import templates from './reducers/templatesReducer'

export default combineReducers({
  warehouse,
  templates,
})
