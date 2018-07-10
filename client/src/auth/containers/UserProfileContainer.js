import React from 'react'
import { connect } from 'react-redux'
import UserProfile from '../components/UserProfile'

const mapStateToProps = state => ({
  user: state.oidc.user
})

export default connect(mapStateToProps)(UserProfile)