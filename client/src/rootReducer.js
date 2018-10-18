import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'
import { reducer as oidcReducer } from 'redux-oidc'
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
  routing: routerReducer,
  oidc: oidcReducer,
  toastr: toastrReducer
})