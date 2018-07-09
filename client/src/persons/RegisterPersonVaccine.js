import React, { Component } from 'react'
import { Redirect } from 'react-router'

class RegisterPersonVaccine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccine: {
        name: '',
        appliedAt: ''
      },
      registered: false
    }
  }

  handleChangeVaccineName(event) {
    this.setState({
      vaccine: {
        ...this.state.vaccine,
        name: event.target.value
      }
    })
  }

  handleChangeVaccineAppliedAt(event, index) {
    this.setState({
      vaccine: {
        ...this.state.vaccine,
        appliedAt: event.target.value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const id = this.props.match.params.id

    fetch(`http://localhost:5000/persons/${id}/vaccines`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state.vaccine)
    })
      .then(response => response.json())
      .then(registered =>
        this.setState({
          registered: true
        }))
      .catch(error => console.error(`Fetch Error =\n`, error))

    this.setState({
      vaccine: {
        name: '',
        appliedAt: ''
      }
    })
  }

  render() {
    const personId = this.props.match.params.id
    
    return (
      <div>
        {this.state.registered && <Redirect to={`/persons/${personId}`} />}
        <form onSubmit={this.handleSubmit.bind(this)} >
          <div className="form-group mt-2">
            <div className="row mt-2">
              <div className="col-sm-8">
                <label htmlFor="vaccineName">Name</label>
                <input onChange={(e) => this.handleChangeVaccineName(e)} value={this.state.vaccine.name} type="text" className="form-control" placeholder="Vaccine Name" />
              </div>
              <div className="col-sm-4">
                <label htmlFor="dependentDocumentNumber">AppliedAt</label>
                <input onChange={(e) => this.handleChangeVaccineAppliedAt(e)} value={this.state.vaccine.appliedAt} type="text" className="form-control" placeholder="YYYY-MM-DD" />
              </div>
            </div>
          </div>
          < div className="row mb-4 mr-1 mt-4 float-right">
            <button type="submit" className="btn btn-primary mr-2">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterPersonVaccine