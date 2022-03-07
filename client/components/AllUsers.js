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
                    {users.map((user) => (
                        <div key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                <h5>{user.firstName + " " + user.lastName}</h5>
                                <h5>{user.username}</h5>
                                <h5>{user.isAdmin ? 'Admin' : ''}</h5>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        allUsers: users.allUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(fetchAllUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
