import React, { Component } from 'react'
import Routes from './Routes'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Shell extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/persons">Vaccine</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/persons">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/persons" role="button" aria-haspopup="true" aria-expanded="false">Person</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/persons/new">Register Person</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes />
        </div>
      </div>
    )
  }
}

export default Shell