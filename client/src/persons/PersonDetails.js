import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

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
    console.log('this.props:', this.props)
    console.log('id', id)
    fetch(`http://localhost:5000/persons/${id}`)
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
        <h1 className="mt-5 mb-2">Person Details</h1>
        <hr />
        <div className="row">
          <div className="col-lg-12 mb-2 justify-content-center text-center">
            <img className="rounded-circle" src={this.state.person.photo} width="100px" height="100px" />
          </div>
          <div className="col-lg-10">
            <label htmlFor="personName">Name</label>
            <p className="form-control">{this.state.person.name}</p>
          </div>
          <div className="col-lg-2">
            <label htmlFor="personAge">Age</label>
            <p className="form-control">{this.state.person.age}</p>
          </div>
        </div>
        <div className="float-right mt-2" >
          <Link to={`/persons/${id}/edit`} className="btn btn-primary mr-2">Edit</Link>
          {/* <button onClick={() => this.handleDeletePerson(p.id)} type="button" className="btn btn-primary m-2">Excluir</button> */}
          <button type="button" onClick={() => this.handleDeletePerson(id)} className="btn btn-primary mr-2">Delete</button>
          <Link to="/persons" className="btn btn-primary">Go Back</Link>
        </div>
        {this.state.person.id && <PersonVaccines personId={this.state.person.id} />}
      </div>
    )
  }
}

export default PersonDetails