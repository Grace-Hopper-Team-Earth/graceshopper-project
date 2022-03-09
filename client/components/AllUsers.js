import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../store/users';

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const users = this.props.allUsers;

    return (
      <div>
        <h2>Registered Users:</h2>
        <div>
          <table width='100%' border='1px solid'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Auth</th>
                <th>More Details</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td align='center'>{user.firstName + ' ' + user.lastName}</td>
                  <td align='center'>{user.username}</td>
                  <td align='center'>{user.isAdmin ? 'Admin' : ''}</td>
                  <td align='center'>
                    {<Link to={`/users/${user.id}`}>See Details</Link>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ users }) => {
  return {
    allUsers: users.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
