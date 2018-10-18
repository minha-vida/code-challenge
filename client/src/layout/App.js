import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { OidcProvider } from 'redux-oidc'
import { Route } from 'react-router'
import ReduxToastr from 'react-redux-toastr'

import { store, persistor, history } from '../store'

import Shell from './Shell'
import { userManager } from '../auth'

const App = () => (
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <div>
                        <Route path='/' component={Shell} />
                        <ReduxToastr
                            timeOut={4000}
                            newestOnTop={false}
                            preventDuplicates
                            position="bottom-right"
                            transitionIn="fadeIn"
                            transitionOut="fadeOut"
                            progressBar />
                    </div>
                </ConnectedRouter>
            </PersistGate>
        </OidcProvider>
    </Provider>
)

export default App