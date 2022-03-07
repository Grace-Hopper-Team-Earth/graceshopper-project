import axios from 'axios';

// action type
const SET_CART = 'SET_CART';
const GET_USER_CART = 'GET_USER_CART'
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// action creator
const _setCart = (cartItems) => {
  return {
    type: SET_CART,
    cartItems,
  };
};

const _getUserCart = (cart) => {
  return {
    type: GET_USER_CART, 
    cartItems
  }
}

const _addToCart = (tea, itemQty = 1) => {
  return {
    type: ADD_TO_CART,
    selectedTeas: {...tea, itemQty}
  }
}
// thunk
export const setCart = () => {
  return (dispatch) => {
    if (!localStorage.token && localStorage.cart) {
      dispatch(_setCart(JSON.parse(localStorage.getItem('cart'))));
    }
  };
};

export const getUserCart = (credential = localStorage.token) => async dispatch => {
  try {
    //retrieve a users cart at '/api/carts/:credential
    const {data} = await axios.get(`/api/carts/${credential}`)
    dispatch(_getUserCart(data))
  } catch (error) {
    next(error)
  }
}


//if guest (not logged in), adds to localstorage
//if logged in, makes axios request to api/carts/:teaid/:credential
export const addTeaToCart = (tea, isLoggedIn) => {
  return async (dispatch, getState) => {
    if (!isLoggedIn) {
      dispatch(_addToCart(tea))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    } else {
      try {
        await axios.post(`/api/carts/${tea.id}/${localStorage.token}`)
      } catch(error) {
        console.log(error)
      }
    }
  }

}

// reducer

const initialCartState = {
  numberOfItems: 0,
  subTotal: 0,
  cartItems: [],
};

export default function (state = initialCartState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cartItems: [...action.cartItems] };
    //determines whether the item is already in cart
    //if yes, add action quantity to the quantity in cart
    //else, set state to include item  
    case ADD_TO_CART: {
      // const itemInCart = state.cartItems.find((item) => {
      //   console.log('this is item in cart', itemInCart)
      //   return item.id === action.product.id
      // })
      // if (itemInCart) {
      //   action.product.itemQty +=itemInCart.itemQty
      //   return {
      //     ...state,
      //     cartItems: state.cartItems.map((item) => {
      //       return item === existingItem ? action.product : item
      //     })
      //   }
      // } else {
      //   return {
      //     ...state, cartItems:  [...state.cartItems, action.product]
      //   }
      // }
      return { ...state, cartItems: [...state.cartItems, action.selectedTeas ] };
    }
    default:
      return state;
  }
}
