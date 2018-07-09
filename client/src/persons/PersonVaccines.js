import React, { Component } from 'react'
import RegisterPersonVaccine from './RegisterPersonVaccine'
import PersonVaccinesList from './PersonVaccinesList'
import AddPersonVaccine from './AddPersonVaccine'

class PersonVaccines extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props, 'props')
    return (
      <div>
        <div className="row mt-4 mb-2">
          <h2 className="ml-3">Vaccines</h2>
        </div>
        <div>
          <AddPersonVaccine personId={this.props.personId} />
          {/* <RegisterPersonVaccine personId={this.props.personId} {...this.props}/> */}
          <PersonVaccinesList {...this.props} />
        </div>
      </div>
    )
  }
}

export default PersonVaccines