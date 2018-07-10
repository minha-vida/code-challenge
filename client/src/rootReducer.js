import { combineReducers } from 'redux'

import { routerReducer } from 'react-router-redux'
// import { reducer as oidcReducer } from 'redux-oidc'

export default combineReducers({
  routing: routerReducer,
  // oidc: oidcReducer
})