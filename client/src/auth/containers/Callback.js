import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CallbackComponent } from 'redux-oidc'
import { push } from 'react-router-redux'
import { userManager } from '../'
import spinner from '../../spinner.svg'

const Callback = ({ redirect }) => (
  <CallbackComponent
    userManager={userManager}
    successCallback={redirect}
    errorCallback={error => {
      console.error(error)
    }}>
    <div className="col text-center mt-5">
      <img src={spinner} width="150px" />
    </div>
  </CallbackComponent>
)

Callback.propTypes = {
  redirect: PropTypes.func.isRequired
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(push('/persons'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Callback)