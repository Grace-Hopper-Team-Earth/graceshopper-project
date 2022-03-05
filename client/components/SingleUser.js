import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store/users';
import { Link, Route } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';

class SingleUser extends React.Component {
    constructor() {
        super();
        this.state = {
            displayUpdateForm: false
        }
        this.dislayUpdateForm = this.dislayUpdateForm.bind(this);
    }

    dislayUpdateForm () {
        this.setState({
            displayUpdateForm: !this.state.displayUpdateForm
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        console.log(userId)
        this.props.getSingleUser(userId);
    }

    render() {
        const user = this.props.singleUser;
        console.log(this.state);

        if (this.state.displayUpdateForm) {
            return <UpdateProfile userId={this.props.match.params.id}/>
        }
        return (
            <div>
                <h3 style={{"marginBottom": "5px"}}>{user.firstName + " " + user.lastName}</h3>
                <h5 style={{"color": "red", "marginTop": "5px"}}>{user.isAdmin ? 'Admin' : ''}</h5>
                <h4>Email: {user.username}</h4>
                <h4>{user.address}</h4>
                <button type="submit" onClick={() => this.dislayUpdateForm()}>Edit Profile</button>
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
