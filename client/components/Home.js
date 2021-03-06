import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = props => {
  const {firstName} = props
  const {isLoggedIn} = props

  return (
    <div>
      <h2 style={{fontFamily: "montserrat"}} >Welcome, {isLoggedIn ? firstName + "!" : 'Friend!'}</h2>
      <Link to={"/teas"}>
          <h2
          style={{fontFamily: "montserrat", justifyContent: 'center'}}>See All Teas</h2>
          <img
            style={{ width: '400px', height: '400px', radius: '200px' }}
            src="https://images.unsplash.com/photo-1556741533-4020f1bf081c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
        </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.auth.firstName,
    isLoggedIn: !!state.auth.id
  }
}

export default connect(mapState)(Home)
