import React from 'react';
import { connect } from 'react-redux';
import { setCart, getUserCart, removeTeaFromCart } from '../store/cart';
import { Link } from 'react-router-dom';


class Cart extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('props inside componentDidMount', this.props);
    
    !this.props.isLoggedIn ?
    this.props.getUserCart(localStorage.token)
    :
    this.props.setCart();
  }

  handleSubmit() {
    this.props.removeTeaFromCart(this.props.tea);
  }
  render() {
    const { cart } = this.props;
    const cartItems = cart.cartItems || []
    console.log("CART ITEMS", cartItems)

    let currentTotal = 0

    if (cartItems.length > 0) {
      const orderTotal = cartItems.map((tea) => {
        return (tea.price * tea.itemQty)
      })
      currentTotal = orderTotal.reduce((a,b) => a + b)
    }
    console.log('this is props', this.props)

    return (
      <div>
        <div>Items in your cart</div>
        <div>
          {cartItems.map((cartItem) => (
            <div key={cartItem.id}>
              <ul>{cartItem.name} 
              <button className="remove-item"
              onClick={() => this.handleSubmit(cartItem.id)}
               >
        Remove From Cart
        </button></ul>
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
    getUserCart: () => dispatch(getUserCart()),
    removeTeaFromCart: (id) => dispatch(removeTeaFromCart(id))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
