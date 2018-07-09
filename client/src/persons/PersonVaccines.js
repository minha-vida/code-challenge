import React, { Component } from 'react'
import RegisterPersonVaccine from './RegisterPersonVaccine'
import PersonVaccinesList from './PersonVaccinesList'

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
          <RegisterPersonVaccine personId={this.props.personId}/>
          <PersonVaccinesList {...this.props} />
        </div>
      </div>
    )
  }
}

export default PersonVaccines