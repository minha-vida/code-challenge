import { createUserManager } from 'redux-oidc'

const config = {
  authority: 'https://accounts.google.com/.well-known/openid-configuration',
  client_id: '820531171267-jeq714dtog6uivk8r0kvcoaid2t8o191.apps.googleusercontent.com',
  scope: `profile email openid`,
  response_type: 'token id_token',
  redirect_uri: 'http://localhost:3000/auth/callback'
}

export default createUserManager(config)