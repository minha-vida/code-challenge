import React, { Component } from 'react'

class PersonVaccines extends Component {
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

  componentDidMount() {
    const id = this.props.personId
    console.log('this.props:', this.props)
    console.log('id', id)
    fetch(`http://localhost:5000/persons/${id}/vaccines`)
      .then(response => response.json())
      .then(vaccines => {
        this.setState({
          vaccines
        })
      })
      .catch(err => console.error(err))
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
    console.log(this.state.vaccines)
    return (
      <div>
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
          {this.state.vaccines.map(v => (
            <div className="card mb-2" style={{ width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title">{v.name}</h5>
                <hr />
                <h6 className="card-subtitle mb-2 text-muted">AppliedAt: {v.appliedAt}</h6>
                <p className="card-text">CreatedAt: {v.createdAt}</p>
                <p className="card-text">UpdatedAt: {v.updatedAt}</p>
                <a href="#" className="card-link">Edit</a>
                <a href="#" className="card-link">Delete</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default PersonVaccines