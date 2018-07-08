import React from 'react'
import { Route, Switch } from 'react-router'

import RegisterPerson from '../persons/RegisterPerson'
import ListPersons from '../persons/ListPersons'
import PersonDetails from '../persons/PersonDetails'

const Routes = () => (
  <Switch>
    <Route path="/persons/new" component={RegisterPerson} />
    <Route to="/persons/:id" component={PersonDetails} />
    {/* <Route to="/persons/:id/edit" component={UpdatePerson} />
    <Route to="/persons/:id/vaccines/new" component={RegisterVaccine} />
    <Route to="/persons/:id/vaccines/edit" component={UpdateVaccine} /> */}
    <Route path="/persons" component={ListPersons} />
  </Switch>
)

export default Routes