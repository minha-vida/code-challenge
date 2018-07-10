import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PersonVaccines extends Component {
  render() {
    const personId = this.props.personId

    return (
      <div className="row justify-content-center mt-4 mb-4">
        <Link className="btn btn-success mr-2" to={`/persons/${personId}/vaccines/new`}>Add New Vaccine</Link>
      </div>
    )
  }
}

export default PersonVaccines