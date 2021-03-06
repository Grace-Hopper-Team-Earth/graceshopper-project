import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import { me } from './store';
import AllTeas from './components/AllTeas';
import SingleTea from './components/SingleTea';
import SingleUser from './components/SingleUser';
import AdminPortal from './components/AdminPortal';
import AllUsers from './components/AllUsers';
import Cart from './components/Cart';
import AddTea from './components/AddTea';
import { Login } from './components/AuthFormLogin';
import { Signup } from './components/AuthFormSignup';
import AdminTeas from './components/AdminTeas';
import AdminSingleTea from './components/AdminSingleTea';
import Checkout from './components/Checkout';
import CheckoutDone from './components/CheckoutDone';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/teas' component={AllTeas} />
            <Route exact path='/home' component={Home} />
            <Route path='/teas/:id' component={SingleTea} />
            <Route path='/users/:id' component={SingleUser} />
            <Route exact path='/carts' component={Cart} />
            <Route exact path='/adminportal' component={AdminPortal} />
            <Route exact path='/users' component={AllUsers} />
            <Route exact path='/adminteas' component={AdminTeas} />
            <Route path='/adminteas/:id' component={AdminSingleTea} />
            <Route path='/adminportal/add' component={AddTea} />
            <Route exact path='/checkout' component={Checkout} />
            <Route path='/checkout/done' component={CheckoutDone} />
            <Redirect to='/home' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/teas' component={AllTeas} />
            <Route exact path='/home' component={Home} />
            <Route path='/teas/:id' component={SingleTea} />
            <Route path='/users/:id' component={SingleUser} />
            <Route path='/carts' component={Cart} />
            <Route exact path='/checkout' component={Checkout} />
            <Route path='/checkout/done' component={CheckoutDone} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
