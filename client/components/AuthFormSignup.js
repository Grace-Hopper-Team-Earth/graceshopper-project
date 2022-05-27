import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthFormSignup = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className = 'signup-container'>
      <form className = 'signup-form' onSubmit={handleSubmit} name={name}>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
          <label htmlFor="username">
            <small>Email</small>
          </label>
          <input name="username" type="text" />
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
          <label htmlFor="address">
            <small>Shipping Address</small>
          </label>
          <textarea 
          name="address"
          rows={4}
          />
          <button type="submit">{displayName}</button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const address = evt.target.address.value
      dispatch(authenticate(username, password, formName, firstName, lastName, address))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(AuthFormSignup)
