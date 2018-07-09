import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class ListPersons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: []
    }
  }

  // Component Will Mount, then, when it's mounted it will do the fetch API
  componentDidMount() {
    fetch('http://localhost:5000/persons')
      .then(response => response.json())
      .then(persons => {
        this.setState({
          persons
        })
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <h1 className="mt-5 mb-2">Registered Persons</h1>
        <table className="table mt-2">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.persons.map(p => (
              <tr>
                <td scope="row">{p.id}</td>
                <td>{p.name}</td>
                <td className="text-right">
                  <Link className="m-2" to={`/persons/${p.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    )
  }
}

export default withRouter(ListPersons)