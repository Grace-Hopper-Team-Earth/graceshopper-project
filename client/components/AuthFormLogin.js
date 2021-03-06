import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthFormLogin = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className = 'login-container'>
      <form className = 'login-form' onSubmit={handleSubmit} name={name}>
          <label htmlFor="username">
            <small>Email</small>
          </label>
          <input name="username" type="text" />
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
          <button type="submit">{displayName}</button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}


const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthFormLogin)
