import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store/users';
import { Link } from 'react-router-dom';
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
        this.props.getSingleUser(userId);
    }

    render() {
        const user = this.props.singleUser;
        console.log(this.state);

        if (this.state.displayUpdateForm) {
            return <UpdateProfile userId={this.props.match.params.id}/>
        }
        return (
            <div className = 'profile-container'>
                <div className = 'profile-wrapper'>
                    <h2 style={{"marginBottom": "5px", "color": "#584C56"}}>{user.firstName + " " + user.lastName}</h2>
                    <h5 style={{"color": "red", "marginTop": "5px"}}>{user.isAdmin ? 'Admin' : ''}</h5>
                    <h4><span className = 'profile-contents'>Email</span> {user.username}</h4>
                    <h4><span className = 'profile-contents'>Address</span> {user.address ? user.address : 'No address on file'}</h4>
                    <button type="submit" onClick={() => this.dislayUpdateForm()}>Edit Profile</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => ({
    singleUser: users.singleUser
})

const mapDispatchToProps = (dispatch) => ({
    getSingleUser: (userId) => dispatch(fetchSingleUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
