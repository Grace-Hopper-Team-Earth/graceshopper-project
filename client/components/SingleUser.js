import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store/users';

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
                <h3>{user.firstName + " " + user.lastName}</h3>
                <h4>{user.email}</h4>
                <h4>{user.address}</h4>
                <h5>{`${user.isAdmin ? 'Admin' : ''}`}</h5>
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
