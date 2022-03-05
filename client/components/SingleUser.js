import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store/users';
import UpdateProfile from './UpdateProfile';

class SingleUser extends React.Component {
    componentDidMount() {
        const userId = this.props.match.params.id;
        console.log(userId)
        this.props.getSingleUser(userId);
    }

    render() {
        const user = this.props.singleUser;
        console.log(user);
        return (
            <div>
                <h3 style={{"marginBottom": "5px"}}>{user.firstName + " " + user.lastName}</h3>
                <h5 style={{"color": "red", "marginTop": "5px"}}>{user.isAdmin ? 'Admin' : ''}</h5>
                <h4>Email: {user.username}</h4>
                <h4>{user.address}</h4>
                <button>Edit Profile</button>
                <UpdateProfile userId={this.props.match.params.id} />
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        singleUser: users.singleUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleUser: (userId) => dispatch(fetchSingleUser(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
