import React, { Component } from 'react'

import PersonVaccinesList from './PersonVaccinesList'
import AddPersonVaccine from './AddPersonVaccine'

class PersonVaccines extends Component {
  render() {
    return (
      <div>
        <div className="row mt-4 mb-2">
          <h2 className="ml-3">Vaccines</h2>
        </div>
        <div>
          <AddPersonVaccine personId={this.props.id} />
          <PersonVaccinesList {...this.props} />
        </div>
      </div>
    )
  }
}

export default PersonVaccines