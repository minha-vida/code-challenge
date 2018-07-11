import React, { Component } from 'react'
import spinner from '../../spinner.svg'

import { userManager } from '../'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    })

    userManager.signinRedirect()
  }

  render() {
    return (
      <div className="row">
        {this.state.loading &&
          <div className="col text-center mt-5">
            <img src={spinner} width="150px" />
          </div>}
      </div>
    )
  }
}

export default Login