import React, { Component } from 'react'
import RegisterPersonVaccine from './RegisterPersonVaccine';
import moment from 'moment'

class GetPersonVaccines extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccines: []
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

  render() {
    return (
      <div>
        {this.state.vaccines.map((v, index) => (
          <div className="card mb-2" key={index} style={{ width: '100%' }}>
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
    )
  }
}

export default GetPersonVaccines