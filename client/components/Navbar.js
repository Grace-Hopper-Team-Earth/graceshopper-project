import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, user }) => {
  return (
    <div className = 'navbar'>
      <div className = 'logo'>
        <img
          src='https://static.vecteezy.com/system/resources/previews/002/913/654/non_2x/cute-hippopotamus-drinking-boba-milk-tea-animal-cartoon-concept-isolated-can-used-for-t-shirt-greeting-card-invitation-card-or-mascot-flat-cartoon-style-free-vector.jpg'
          width='120'
          height='120'
        />
        <h1>Hippo Tea</h1>
        <h4>Made to Order Bubble Teas</h4>
      </div>
      <nav>
        {isLoggedIn && user.isAdmin ? (
          <div className = 'navbar'>
            {/* The navbar will show these links after you log in */}
            <Link className='link-nav' to='/adminportal'>Admin Portal</Link>
            <Link className='link-nav' to='/adminteas'>Manage Teas</Link>
            <Link className='link-nav' to="/users">Manage Users</Link>
            <Link className='link-nav' to={`/users/${user.id}`}>My Profile</Link>
            <a className='link-nav' href='#' onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : isLoggedIn ? (
          <div className = 'navbar'>
            {/* The navbar will show these links after you log in */}
            <Link className='link-nav' to='/home'>Home</Link>
            <Link className='link-nav' to='/teas'>Bubble Teas</Link>
            <Link className='link-nav' to={`/users/${user.id}`}>Profile</Link>
            <Link className='link-nav' to={`/carts`}>Cart</Link>
            <a className='link-nav' href='#' onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className = 'navbar'>
            {/* The navbar will show these links before you log in */}
            <Link className='link-nav' to='/home'>Home</Link>
            <Link className='link-nav' to='/teas'>Bubble Teas</Link>
            <Link className='link-nav' to='/login'>Login</Link>
            <Link className='link-nav' to='/signup'>Sign Up</Link>
            <Link className='link-nav' to={`/carts`}>Cart</Link>
          </div>
        )}
      </nav>
      <hr className='border-nav' />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
