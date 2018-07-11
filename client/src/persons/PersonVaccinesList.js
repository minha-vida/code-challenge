import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import spinner from '../spinner.svg'

class PersonVaccinesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccines: [],
      loading: false
    }
  }

  listVacinnes() {
    this.setState({
      loading: true
    })

    const { id } = this.props

    fetch(`http://localhost:5000/persons/${id}/vaccines`, {
      headers: {
        Authorization: `Bearer ${this.props.idToken}`
      }
    })
      .then(response => response.json())
      .then(vaccines => {
        this.setState({
          vaccines,
          loading: false
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
        toastr.success('Deleted', 'The vaccine has been deleted!')
      }).catch(error => console.error(`Fetch Error =\n`, error))
  }

  render() {
    const { id: personId } = this.props
    return (
      <div className="row">
        {this.state.loading &&
          <div className="col text-center mt-5">
            <img src={spinner} width="150px" />
          </div>}
        {!this.state.loading && this.state.vaccines.map((v, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {v.name}
                </h5>
                <p className="card-text">Applied <strong>{moment(v.appliedAt).format('LL')}</strong></p>
                <div className="text-right">
                  <Link className="btn btn-outline-primary mr-2" to={`/persons/${personId}/vaccines/${v.id}/edit`}>Edit</Link>
                  <button type="button" onClick={() => this.handleDeleteVaccine(personId, v.id)} className="btn btn-outline-danger">Delete</button>
                </div>
              </div>
              <div className="card-footer">
                <p className="card-text text-muted">Created {moment(v.createdAt).fromNow()}</p>
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