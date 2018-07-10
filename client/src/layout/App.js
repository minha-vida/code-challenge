import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { OidcProvider } from 'redux-oidc'

import { store, persistor, history } from '../store'

import Shell from './Shell'
import { userManager } from '../auth'

const App = () => (
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Shell />
                </ConnectedRouter>
            </PersistGate>
        </OidcProvider>
    </Provider>
)

export default App