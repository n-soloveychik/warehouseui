import { combineReducers } from 'redux'

import warehouse from './reducers/warehouseReducer'
// import templates from './reducers/templatesReducer'
import error from './reducers/errorReducer'
import router from './reducers/routerReducer'

export default combineReducers({
  warehouse,
  router,
  // templates,
  error,
})
