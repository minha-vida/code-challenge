import React from 'react'
import { Route, Switch } from 'react-router'

import RegisterPerson from '../persons/RegisterPerson'
import ListPersons from '../persons/ListPersons'
import PersonDetails from '../persons/PersonDetails'
import UpdatePerson from '../persons/UpdatePerson'
import UpdateVaccine from '../persons/UpdateVaccine'

const Routes = () => (
  <Switch>
    <Route exact path="/persons" component={ListPersons} />
    <Route path="/persons/new" component={RegisterPerson} />
    <Route path="/persons/:id" component={PersonDetails} />
    <Route path="/persons/:id/edit" component={UpdatePerson} />
    {/* <Route path="/persons/:id/vaccines/new" component={RegisterVaccine} /> */}
    <Route path="/persons/:id/vaccines/edit" component={UpdateVaccine} />
  </Switch>
)

export default Routes