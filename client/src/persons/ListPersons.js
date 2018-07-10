import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class ListPersons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: []
    }
  }

  // Component Will Mount, then, when it's mounted it will do the fetch API
  componentDidMount() {
    fetch('http://localhost:5000/persons', {
      headers: {
        Authorization: `Bearer ${this.props.idToken}`
      }
    })
      .then(response => response.json())
      .then(persons => {
        this.setState({
          persons
        })
      })
      .catch(error => console.error(`Fetch Error =\n`, error))
  }

  render() {
    return (
      <div>
        <h1 className="mt-5 mb-4">Registered Persons</h1>
        <div className="row">
          {this.state.persons.map((p, index) => (
            <div className="col-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <div className="text-center">
                    <img className="rounded-circle" src={p.photo} width="80px" height="80px" alt="Person Photo" />
                  </div>
                  <h5 className="card-title">
                    {p.name}, <span className="text-muted">{p.age}</span>
                  </h5>
                  <Link className="btn btn-primary mr-2" to={`/persons/${p.id}`}>Details</Link>
                </div>
                <div className="card-footer">
                  <p className="card-text"><strong>{p.vaccinesCount}</strong> Vaccines</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  idToken: state.oidc.user.id_token
})

export default connect(mapStateToProps)(withRouter(ListPersons))