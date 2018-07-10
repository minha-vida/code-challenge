import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { UserProfile } from '../auth'
import Routes from './Routes'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Shell extends Component {

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to='/' className="navbar-brand">Vaccine</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/persons" role="button" aria-haspopup="true" aria-expanded="false">Persons</a>
                  <div className="dropdown-menu">
                    <Link to={'/persons'} className="dropdown-item">List Persons</Link>
                    <Link to={'/persons/new'} className="dropdown-item">Register Person</Link>
                  </div>
                </li>
              </ul>
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <UserProfile />
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

const mapStateToProps = state => ({
  user: state.oidc.user
})

export default connect(mapStateToProps)(Shell)