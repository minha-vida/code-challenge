import React, { Component } from 'react'

class PersonDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccines: [],
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
    console.log(this.state.vaccine)
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
        <h1 className="mt-5 mb-2">Person Details</h1>
        <hr />
        <div className="row">
          <div className="col-lg-12 mb-2 justify-content-center text-center">
            <img className="rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCI42_N5Q7XKJBS9T3s-XtBGtTqTVriYhkFoIfmjOBkrQBmqt" width="100px" height="100px" />
          </div>
          <div className="col-lg-10">
            <label htmlFor="personName">Name</label>
            <p className="form-control">Name</p>
          </div>
          <div className="col-lg-2">
            <label htmlFor="personAge">Age</label>
            <p className="form-control">Age</p>
          </div>
        </div>
        <div className="row mt-4 mb-2">
          <h2 className="ml-3">Vaccines</h2>
        </div>
        <div>
          <div className="mt-2">
            <div className="row mt-2">
              <div className="col-sm-8">
                <label htmlFor="vaccineName">Name</label>
                <input onChange={(e) => this.handleChangeVaccineName(e)} value={this.state.vaccine.name} type="text" className="form-control" placeholder="Vaccine Name" />
              </div>
              <div className="col-sm-4">
                <label htmlFor="dependentDocumentNumber">AppliedAt</label>
                <input onChange={(e) => this.handleChangeVaccineAppliedAt(e)} value={this.state.vaccine.appliedAt} type="text" className="form-control" placeholder="AppliedAt" />
              </div>
            </div>
          </div>
          < div className="row mb-4 mr-1 mt-4 float-right" >
            <button onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-primary mr-2">Save</button>
          </div>
          <div className="card mb-2" style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title">Rubeola</h5>
              <hr />
              <h6 className="card-subtitle mb-2 text-muted">AppliedAt: 12/05/2018</h6>
              <p className="card-text">CreatedAt: 12/05/2018</p>
              <p className="card-text">UpdatedAt: 12/05/2018</p>
              <a href="#" class="card-link">Edit</a>
              <a href="#" class="card-link">Delete</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonDetails