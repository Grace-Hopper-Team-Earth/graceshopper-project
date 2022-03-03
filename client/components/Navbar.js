import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  
  return (
  <div>
    <img src='https://static.vecteezy.com/system/resources/previews/002/913/654/non_2x/cute-hippopotamus-drinking-boba-milk-tea-animal-cartoon-concept-isolated-can-used-for-t-shirt-greeting-card-invitation-card-or-mascot-flat-cartoon-style-free-vector.jpg' 
    width="100"
    height="100"/>
    <h1>Hippo Tea</h1>
    <h4>Made to order bubble teas</h4>
    
    
    <nav>
      {isLoggedIn && user.isAdmin ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/teas">Bubble Teas</Link>
          <Link to={`/users/${user.id}`}>Profile</Link>
          <Link to="/adminportal">Admin Portal</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/teas">Bubble Teas</Link>
          <Link to={`/users/${user.id}`}>Profile</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/teas">Bubble Teas</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth
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
