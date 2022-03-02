import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleUser } from '../store/users';

class SingleUser extends React.Component {

}

const mapStateToProps = ({ users }) => {
    return {
        singleUser: users.singleUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
