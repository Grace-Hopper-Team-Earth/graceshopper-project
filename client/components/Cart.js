import React from 'react';
import { connect } from 'react-redux';
import { setCart } from '../store/cart';
import { Link } from 'react-router-dom';


class Cart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    console.log('props inside componentDidMount', this.props);
    this.props.isLoggedIn ?
    this.props.getUserCart(localStorage.token)
    :
    this.props.setCart();
  }
  render() {
    const { cart } = this.props;
    return (
      <div>
        <div>Items In Cart</div>
        <div>
          {cart.cartItems.map((cartItem) => {
            <div key={cartItem.id}>
              <div>Each Item</div>
            </div>;
          })}
        </div>
        <div>Total: {cart.subTotal}</div>
        <button>Checkout</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: () => dispatch(setCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
