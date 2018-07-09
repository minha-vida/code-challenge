import React, { Component } from 'react'

class RegisterPersonVaccine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccine: {
        name: '',
        appliedAt: ''
      }
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

    const id = this.props.personId

    fetch(`http://localhost:5000/persons/${id}/vaccines`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state.vaccine)
    })
      .then(response => response.json())
      .catch(error => console.error(`Fetch Error =\n`, error));

    this.setState({
      vaccine: {
        name: '',
        appliedAt: ''
      }
    })
  }

  render() {
    return (
      <div>
        <div className="mt-2">
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
        < div className="row mb-4 mr-1 mt-4 float-right" >
          <button onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-primary mr-2">Save</button>
        </div>
      </div>
    )
  }
}

export default RegisterPersonVaccine