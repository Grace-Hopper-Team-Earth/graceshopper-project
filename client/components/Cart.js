import React from 'react';
import { connect } from 'react-redux';
// import { fetchSingleCart } from '../redux/carts';
// import SingleTea from './SingleTea';
import { Link } from 'react-router-dom';
// import UpdateCart from './UpdateCart';

class IndividualCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchSingleCart(this.props.match.params.id);
  }

  render() {
    if (this.props.singleCart) {
      const thisCartTea = this.props.singleCart.tea;
      return (
        <div>
          <h1>Ready for some tea?</h1>
          <h2>Your cart:</h2>
          <ul>
            <li>
              <b>Number of items:</b> {this.props.singleRobot.fuelType}
            </li>
            <li>
              <b>Subtotal:</b> {this.props.singleRobot.fuelLevel}
            </li>
          </ul>
          <h2>Here are my current projects:</h2>
          {thisCartTea && thisCartTea.length > 0 ? (
            thisCartTea.map((tea) => (
              <div key={tea.id}>
                <SingleTeaMenu tea={tea} />
                <button>remove from cart</button>
              </div>
            ))
          ) : (
            <div>
              <h4>
                You don't have any teas in your cart yet.
              </h4>
              <img
                className="cartoon"
                src="https://static.vecteezy.com/system/resources/previews/002/913/654/non_2x/cute-hippopotamus-drinking-boba-milk-tea-animal-cartoon-concept-isolated-can-used-for-t-shirt-greeting-card-invitation-card-or-mascot-flat-cartoon-style-free-vector.jpg"
                width="100%"
                height="100%"
              />
            </div>
          )}
        </div>
      );
    } else {
      return <h3>sorry, we are having trouble locating your cart :(</h3>;
    }
  }
}

const mapStateToProps = (state) => ({
  singleCart: state.carts.singleCart,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSingleCart: (id) => dispatch(fetchSingleCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualCart);