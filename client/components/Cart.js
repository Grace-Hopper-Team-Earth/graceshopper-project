import React from 'react';
import { connect } from 'react-redux';
import { setCart, getUserCart } from '../store/cart';
import { Link } from 'react-router-dom';


class Cart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    console.log('props inside componentDidMount', this.props);
    //I am a bit confused by isLoggedIn...not sure how it works :(
    this.props.isLoggedIn ?
    this.props.getUserCart(localStorage.token)
    :
    this.props.setCart();
  }
  render() {
    const { cart } = this.props;
    const cartItems = cart.cartItems || []
    let currentTotal = 0
    const itemsInCart = cartItems.map((item)=> {
      return (
        <div>
          <ul>
            <li item = {item} key = {item.id}>
              {item.name}
            </li>
          </ul>
        </div>
      )
    })

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
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: () => dispatch(setCart()),
    getUserCart: () => dispatch(getUserCart())

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
