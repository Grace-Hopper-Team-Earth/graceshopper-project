import React from 'react';
import { connect } from 'react-redux';
import { setCart, getUserCart, removeTeaFromCart } from '../store/cart';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn ?
    this.props.getUserCart(localStorage.token)
    :
    this.props.setCart();
  }

  render() {
    const { cart, isLoggedIn } = this.props;
    const cartItems = cart.cartItems || []

    let currentTotal = 0;
    
    if (cartItems.length > 0) {
      console.log(cartItems)
      const orderTotal = cartItems.map((tea) => {
        if(this.props.isLoggedIn === false) {
          return tea.price*tea.itemQty

        } else {
          return (tea.price * tea.carttea.itemQty)
        }
      })
      currentTotal = orderTotal.reduce((a,b) => a + b)
    }
   
    return (
      <div className = 'cart-container'>
        <div className = 'cart-wrapper'>
          <h3>Your Cart</h3>
            {cartItems.map((cartItem) => (
              <div key={cartItem.id}>
                <ul>
                  <span className = 'cart-qty'>
                    {isLoggedIn === true ? cartItem.carttea.itemQty : cartItem.itemQty}
                  </span>
                  {cartItem.name} 
                  <button className="remove-item"
                  onClick={() => this.props.removeTeaFromCart(cartItem, isLoggedIn)}>
                  Remove Item
                  </button>
                </ul>
              </div>
            ))}
          <div className = 'order-details'>
              <h4>Order Total: ${currentTotal}</h4>
              <Link className = 'checkout' to="/checkout">Checkout</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: () => dispatch(setCart()),
    getUserCart: () => dispatch(getUserCart()),
    removeTeaFromCart: (cartItem, history) => dispatch(removeTeaFromCart(cartItem, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
