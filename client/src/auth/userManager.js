import { createUserManager } from 'redux-oidc'

const config = {
  authority: 'https://accounts.google.com/.well-known/openid-configuration',
  client_id: process.env.REACT_APP_CLIENT_ID,
  scope: `profile email openid`,
  response_type: 'token id_token',
  redirect_uri: `${window.location.origin}/auth/callback`
}

export default createUserManager(config)