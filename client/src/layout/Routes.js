import React from 'react'
import { Route, Switch } from 'react-router'

import RegisterPerson from '../persons/RegisterPerson'
import ListPersons from '../persons/ListPersons'
import PersonDetails from '../persons/PersonDetails'
import UpdatePerson from '../persons/UpdatePerson'
import UpdateVaccine from '../persons/UpdateVaccine'
import RegisterPersonVaccine from '../persons/RegisterPersonVaccine'
import Home from '../home/Home'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/persons" component={ListPersons} />
    <Route path="/persons/new" component={RegisterPerson} />
    <Route path="/persons/:id/edit" component={UpdatePerson} />
    <Route path="/persons/:id/vaccines/new" component={RegisterPersonVaccine} />
    <Route path="/persons/:id/vaccines/:vaccineId/edit" component={UpdateVaccine} />
    <Route path="/persons/:id" component={PersonDetails} />
  </Switch>
)

export default Routes