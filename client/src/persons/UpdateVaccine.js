import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

class UpdateVaccine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccine: {
        name: '',
        appliedAt: ''
      },
      updated: false
    }
  }

  componentDidMount() {
    const personId = this.props.match.params.id
    const vaccineId = this.props.match.params.vaccineId

    fetch(`http://localhost:5000/persons/${personId}/vaccines/${vaccineId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.idToken}`,
        "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then(response => response.json())
      .then(vaccine =>
        this.setState({
          vaccine: {
            name: vaccine.name,
            appliedAt: vaccine.appliedAt
          }
        }))
        .catch(error => console.error(`Fetch Error =\n`, error))
  }

  handleChangeVaccineName(event) {
    this.setState({
      vaccine: {
        ...this.state.vaccine,
        name: event.target.value
      }
    })
  }

  handleChangeVaccineAppliedAt(event) {
    this.setState({
      vaccine: {
        ...this.state.vaccine,
        appliedAt: event.target.value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const personId = this.props.match.params.id
    const vaccineId = this.props.match.params.vaccineId

    fetch(`http://localhost:5000/persons/${personId}/vaccines/${vaccineId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${this.props.idToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state.vaccine)
    })
      .then(response => response.json())
      .then(updated =>
        this.setState({
          updated: true
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
        {this.state.updated && <Redirect to={`/persons/${personId}`} />}
        <div className="container">
          <h1 className="mt-5 mb-2">Update vaccine</h1>
          <hr />
          <form className="needs-validation" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-row">
              <div className="col-md-8 mb-3">
                <label htmlFor="validationTooltip01">Name</label>
                <input onChange={(e) => this.handleChangeVaccineName(e)} value={this.state.vaccine.name} type="text" className="form-control" id="validationTooltip01" placeholder="Vaccin Name" required />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="validationTooltip02">AppliedAt</label>
                <input onChange={(e) => this.handleChangeVaccineAppliedAt(e)} value={moment(this.state.vaccine.appliedAt).format('YYYY-MM-DD')} type="date" className="form-control" id="validationTooltip02" placeholder="YYYY-MM-DD" required />
              </div>
            </div>
            <div className="float-right" >
              <Link to={`/persons/${personId}`} className="btn btn-primary mr-2">Go Back</Link>
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  idToken: state.oidc.user.id_token
})

export default connect(mapStateToProps)(UpdateVaccine)