import React from 'react';
import { connect } from 'react-redux';
import { setCart } from '../store/cart';

class Cart extends React.Component {
  componentDidMount() {
    console.log('props inside componentDidMount', this.props);
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
