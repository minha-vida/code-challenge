import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import PersonVaccines from './PersonVaccines';

class PersonDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      person: {},
      deleted: false
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id

    fetch(`http://localhost:5000/persons/${id}`, {
      headers: {
        Authorization: `Bearer ${this.props.idToken}`
      }
    })
      .then(response => response.json())
      .then(person => {
        this.setState({
          person
        })
      })
      .catch(error => console.error(`Fetch Error =\n`, error))
  }

  handleDeletePerson(id) {
    fetch(`http://localhost:5000/persons/${id}`, {
      headers: {
        Authorization: `Bearer ${this.props.idToken}`
      },
      method: 'DELETE'
    })
      .then(deleted =>
        this.setState({
          deleted: true
        }))
      .catch(error => console.error(`Fetch Error =\n`, error))
  }

  render() {
    const id = this.props.match.params.id

    return (
      <div>
        {this.state.deleted && <Redirect to='/persons' />}
        <div className="row">
          <div className="col mt-5 justify-content-center text-center">
            <img className="rounded-circle" src={this.state.person.photo} width="100px" height="100px" alt="Person Details" />
          </div>
        </div>
        <h1 className="mt-5 mb-2">
          {this.state.person.name},
          <span className="text-muted">{this.state.person.age}</span>
        </h1>
        <hr />
        <div className="row">
          <div className="col">
            <div className="float-right mt-2" >
              <Link to="/persons" className="btn btn-primary mr-2">Go Back</Link>
              <Link to={`/persons/${id}/edit`} className="btn btn-primary mr-2">Edit</Link>
              <button type="button" onClick={() => this.handleDeletePerson(id)} className="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
        {this.state.person.id && <PersonVaccines personId={this.state.person.id} />}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  idToken: state.oidc.user.id_token
})

export default connect(mapStateToProps)(PersonDetails)