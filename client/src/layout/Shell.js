import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { UserProfile } from '../auth'
import Routes from './Routes'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class Shell extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to='/' className="navbar-brand">Vaccine</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {this.props.user && (
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/persons" role="button" aria-haspopup="true" aria-expanded="false">Persons</a>
                    <div className="dropdown-menu">
                      <Link to={'/persons'} className="dropdown-item">List Persons</Link>
                      <Link to={'/persons/new'} className="dropdown-item">Register Person</Link>
                    </div>
                  </li>
                </ul>
              )}
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
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