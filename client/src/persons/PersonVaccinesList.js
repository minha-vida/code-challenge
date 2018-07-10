import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class PersonVaccinesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccines: []
    }
  }

  listVacinnes() {
    const id = this.props.personId

    fetch(`http://localhost:5000/persons/${id}/vaccines`, {
      headers: {
        Authorization: `Bearer ${this.props.idToken}`
      }
    })
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
      headers: {
        Authorization: `Bearer ${this.props.idToken}`
      },
      method: 'DELETE'
    })
      .then(deleted => {
        this.listVacinnes()
      }).catch(error => console.error(`Fetch Error =\n`, error))
  }

  render() {
    const personId = this.props.personId
    return (
      <div className="row">
        {this.state.vaccines.map((v, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">{v.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">Applied: {moment(v.appliedAt).format('LL')}</p>
                <p className="card-text text-muted">Created {moment(v.createdAt).fromNow()}</p>
                <Link className="btn btn-primary mr-2" to={`/persons/${personId}/vaccines/${v.id}/edit`}>Edit</Link>
                <button type="button" onClick={() => this.handleDeleteVaccine(personId, v.id)} className="btn btn-primary">Delete</button>
              </div>
              <div className="card-footer">
                <p className="card-text text-muted">Updated {moment(v.updatedAt).fromNow()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    )
  }
}
const mapStateToProps = state => ({
  idToken: state.oidc.user.id_token
})

export default connect(mapStateToProps)(PersonVaccinesList)