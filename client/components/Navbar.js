import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Hippo Tea</h1>
    <h4>Made to order bubble teas</h4>
    <img src='https://st2.depositphotos.com/15146240/48329/v/380/depositphotos_483299434-stock-illustration-cute-hippopotamus-drinking-boba-milk.jpg?forcejpeg=true' 
    width="100"
    height="100"/>
    
    <nav>
      {/*Jess commented out these lines to get the logged in experience... {isLoggedIn ? ( */}
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/tea">Bubble Teas</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      {/* ) : ( */}
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      {/* )} */}
    </nav>
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
