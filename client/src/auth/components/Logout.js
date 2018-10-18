import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { userManager } from '../'

class Logout extends Component {
  componentDidMount() {
    userManager.removeUser()
  }

  render() {
    return <Redirect to='/' />
  }
}

export default Logout