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
      <div>
        {this.state.vaccines.map((v, index) => (
          <div className="card mb-2" key={index} style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title">{v.name}</h5>
              <hr />
              <h6 className="card-subtitle mb-2 text-muted">AppliedAt: {moment(v.appliedAt).format('DD/MM/YYYY')}</h6>
              <p className="card-text">CreatedAt: {moment(v.createdAt).format('DD/MM/YYYY')}</p>
              <p className="card-text">UpdatedAt: {moment(v.updatedAt).format('DD/MM/YYYY')}</p>
              <Link className="btn btn-primary mr-2" to={`/persons/${personId}/vaccines/${v.id}/edit`}>Edit</Link>
              <button type="button" onClick={() => this.handleDeleteVaccine(personId, v.id)} className="btn btn-primary">Delete</button>
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