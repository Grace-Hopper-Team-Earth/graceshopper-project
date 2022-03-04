import axios from 'axios';

// action type
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// action creator
const _setCart = (cartItems) => {
  return {
    type: SET_CART,
    cartItems,
  };
};
// thunk
export const setCart = () => {
  return (dispatch) => {
    if (!localStorage.token && localStorage.cart) {
      dispatch(_setCart(JSON.parse(localStorage.getItem('cart'))));
    }
  };
};

// reducer

const initialState = {
  numberOfItems: 0,
  subTotal: 0,
  cartItems: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cartItems: [...action.cartItems] };
    default:
      return state;
  }
}
