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
    
    !this.props.isLoggedIn ?
    this.props.getUserCart(localStorage.token)
    :
    this.props.setCart();
  }
  render() {
    const { cart } = this.props;
    const cartItems = cart.cartItems || []
    console.log("CART ITEMS", cartItems)

    let currentTotal = 0

    if (cartItems.length > 0) {
      const orderTotal = cartItems.map((tea) => {
        return (tea.price * tea.carttea.itemQty)
      })
      currentTotal = orderTotal.reduce((a,b) => a + b)
    }

    return (
      <div>
        <div>Items in your cart</div>
        <div>
          {cartItems.map((cartItem) => (
            <div key={cartItem.id}>
              <ul>{cartItem.name}</ul>
            </div>
          ))}
        </div>
        <div>Order Total: ${currentTotal}</div>
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
