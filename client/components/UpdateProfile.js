import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser, _updateUser } from '../store/users';

class UpdateProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            address: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getSingleUser(this.props.userId);
        if (this.props.user.id !== undefined) {
            this.setState({
                firstName: this.props.user.firstName || '',
                lastName: this.props.user.lastName || '',
                username: this.props.user.username || '',
                address: this.props.user.address || ''
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.id !== this.props.user.id) {
            this.setState({
                firstName: this.props.user.firstName || '',
                lastName: this.props.user.lastName || '',
                username: this.props.user.username || '',
                address: this.props.user.address || ''
            })
        }
    }

    handleSubmit (evt) {
        evt.preventDefault();
        this.props.updateProfile({ ...this.props.user, ...this.state})
    }

    handleChange (evt) {
        console.log(evt.target)
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        console.log(this.state.firstName)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        placeholder="First Name..."
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        placeholder="Last Name..."
                    />

                    <label htmlFor="username">Email</label>
                    <input 
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        placeholder="Email..."
                    /> 

                    <label htmlFor="address">Delivery Address</label>
                    <input 
                        type="text"
                        name="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                        placeholder="Delivery Address..."
                    />

                    <button type="submit" >Update Profile</button>
                    <button>Discard</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        user: users.singleUser
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        updateProfile: (user) => dispatch(_updateUser(user, history)),
        getSingleUser: (userId) => dispatch(fetchSingleUser(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
