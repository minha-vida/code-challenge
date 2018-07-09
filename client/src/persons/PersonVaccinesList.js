import React, { Component } from 'react'
import moment from 'moment'
import { Redirect } from 'react-router'

import RegisterPersonVaccine from './RegisterPersonVaccine';

class PersonVaccinesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccines: []
    }
  }

  listVacinnes() {
    const id = this.props.personId
    
    fetch(`http://localhost:5000/persons/${id}/vaccines`)
      .then(response => response.json())
      .then(vaccines => {
        this.setState({
          vaccines
        })
      })
      .catch(error => console.error(`Fetch Error =\n`, error))
  }

  componentDidMount() {
    this.listVacinnes()
  }

  handleDeleteVaccine(personId, vaccineId) {
    fetch(`http://localhost:5000/persons/${personId}/vaccines/${vaccineId}`, {
      method: 'DELETE'
    })
      .then(deleted => {
        this.listVacinnes()
      }).catch(error => console.error(`Fetch Error =\n`, error))
  }

  render() {
    const personId = this.props.personId
    return (
      <div>
        {this.state.vaccines.map((v, index) => (
          <div className="card mb-2" key={index} style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title">{v.name}</h5>
              <hr />
              <h6 className="card-subtitle mb-2 text-muted">AppliedAt: {moment(v.appliedAt).format('DD/MM/YYYY')}</h6>
              <p className="card-text">CreatedAt: {moment(v.createdAt).format('DD/MM/YYYY')}</p>
              <p className="card-text">UpdatedAt: {moment(v.updatedAt).format('DD/MM/YYYY')}</p>
              <a href="#" className="card-link">Edit</a>
              <a href="#" onClick={() => this.handleDeleteVaccine(personId, v.id)} className="card-link">Delete</a>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default PersonVaccinesList