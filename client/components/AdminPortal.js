import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminPortal = ({ firstName }) => {
    return (
        <div>
            <h3>Welcome back, {firstName}</h3>
            <h1>Administrator Dashboard</h1>           
            <Link to="/adminteas">
                <h2>All Current Teas</h2>
            </Link>
            <Link to="/users">
                <h2>All Current Users</h2>
            </Link>
            <img
            style={{ width: '400px', height: '400px', radius: '200px' }}
            src="https://images.unsplash.com/photo-1556741533-4020f1bf081c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          />
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapStateToProps)(AdminPortal);
