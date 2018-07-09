import React, { Component } from 'react'
import PersonVaccines from './PersonVaccines';

class PersonDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      person: {}
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
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
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
        {this.state.person.id && <PersonVaccines personId={this.state.person.id} />}
      </div>
    )
  }
}

export default PersonDetails