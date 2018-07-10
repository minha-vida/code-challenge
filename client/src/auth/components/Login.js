import React, { Component } from 'react'

import { userManager } from '../'

class Login extends Component {
  componentDidMount() {
    userManager.signinRedirect()
  }

  render() {
    return <h1>Redirecting to login</h1>
  }
}

export default Login