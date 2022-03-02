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
                {users.map((user) => {
                    <div key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            <p>{user.firstName + " " + user.lastName}</p>
                            <p>{user.email}</p>
                            <p>{user.isAdmin ? 'Admin' : ''}</p>
                        </Link>
                    </div>
                })}
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
