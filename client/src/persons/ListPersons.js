import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListPersons extends Component {
  render() {
    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>21</td>
              <td className="text-right">
                {/* <Link className="m-2" to={`/persons/${person.id}`}>Detalhes</Link> */}
                {/* <Link className="m-2" to={`/persons/${person.id}/edit`}>Edit</Link> */}
                {/* <button onClick={() => this.handleDeletePerson(person.id)} type="button" className="btn btn-primary m-2">Excluir</button> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListPersons