import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createHistory from 'history/createBrowserHistory'
import createOidcMiddleware, { } from 'redux-oidc'

import { userManager } from './auth'
import reducer from './rootReducer'

const oidcMiddleware = createOidcMiddleware(userManager)

const initialState = { }

const history = createHistory()

const createStoreWithMiddlewares = compose(
  applyMiddleware(oidcMiddleware, routerMiddleware(history))
)(createStore)

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStoreWithMiddlewares(persistedReducer, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const persistor = persistStore(store)

export {
  store,
  persistor,
  history
}