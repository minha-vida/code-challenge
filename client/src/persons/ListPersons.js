import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListPersons extends Component {
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
            <tr>
              <td scope="row">12</td>
              <td>Mark</td>
              <td className="text-right">
                {/* <Link className="m-2" to={`/persons/${person.id}`}>Detalhes</Link> */}
                <Link className="mr-1" to="">Details</Link>
                {/* <Link className="m-2" to={`/persons/${person.id}/edit`}>Edit</Link> */}
                <Link className="mr-1" to="">Edit</Link>
                {/* <button onClick={() => this.handleDeletePerson(person.id)} type="button" className="btn btn-primary m-2">Excluir</button> */}
                <button type="button" className="btn btn-primary">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div >
    )
  }
}

export default ListPersons