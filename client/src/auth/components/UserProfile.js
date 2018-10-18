import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserProfile = ({ user }) => {
  const welcome = () => (
    <ul className="navbar-nav my-2 my-sm-0">
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle"
          id="navbarDropdownUserProfile"
          aria-haspopup="true"
          aria-expanded="false"
          data-toggle="dropdown">
            Hello! {user.profile.given_name}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownUserProfile">
          <Link to='/auth/logout' className="dropdown-item">Logout</Link>
        </div>
      </li>
    </ul>
  )

  const login = () => (
    <Link to='/auth/login' className='btn btn-light my-2 my-sm-0'>Login</Link>
  )

  return user ? welcome() : login()
}

UserProfile.propTypes = {
  user: PropTypes.object
}

export default UserProfile