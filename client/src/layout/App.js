import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor, history } from '../store'

import Shell from './Shell'

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Shell />
            </ConnectedRouter>
        </PersistGate>
    </Provider>
)

export default App