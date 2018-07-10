import React from 'react'
import { Route, Switch } from 'react-router'

import RegisterPerson from '../persons/RegisterPerson'
import ListPersons from '../persons/ListPersons'
import PersonDetails from '../persons/PersonDetails'
import UpdatePerson from '../persons/UpdatePerson'
import UpdateVaccine from '../persons/UpdateVaccine'
import RegisterPersonVaccine from '../persons/RegisterPersonVaccine'
import Home from '../home/Home'
import { Login, Logout, Callback, PrivateRoute } from '../auth'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/logout" component={Logout} />
    <Route path="/auth/callback" component={Callback} />
    <PrivateRoute exact path="/persons" component={ListPersons} />
    <PrivateRoute path="/persons/new" component={RegisterPerson} />
    <PrivateRoute path="/persons/:id/edit" component={UpdatePerson} />
    <PrivateRoute path="/persons/:id/vaccines/new" component={RegisterPersonVaccine} />
    <PrivateRoute path="/persons/:id/vaccines/:vaccineId/edit" component={UpdateVaccine} />
    <PrivateRoute path="/persons/:id" component={PersonDetails} />
  </Switch>
)

export default Routes