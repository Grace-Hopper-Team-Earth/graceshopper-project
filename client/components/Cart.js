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
    console.log("TYPE OF CART ITEMS", typeof cart.cartItems)
    console.log("CART ITEMS TEAS", cart["cartItems"][0])
    const cartItems = cart.cartItems || []

    // let currentTotal = 0

    return (
      <div>
        <div>Items In Cart</div>
        <div>
          {cartItems.map((cartItem) => (
            <div key={cartItem.id}>
              <div>Each Item</div>
              <ul>
                <li>{cartItem.name}</li>
              </ul>
            </div>
          ))}
        </div>
        <div>Total: {cart.subTotal}</div>
        <button>Checkout</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(">>>>>>>>", state.cart)
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
