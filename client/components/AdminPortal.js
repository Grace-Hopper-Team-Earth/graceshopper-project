import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminPortal = ({ firstName }) => {
  return (
    <div>
      <h3>Welcome back, {firstName}</h3>
      <h1>Administrator Dashboard</h1>
      <Link to='/users'>
        <h2>View All Current Users</h2>
      </Link>
      <Link to='/adminportal/add'>
        <h2>Add More Milk Tea</h2>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapStateToProps)(AdminPortal);
