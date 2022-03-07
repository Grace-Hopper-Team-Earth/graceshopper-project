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

const _getUserCart = (cartItems) => {
  return {
    type: GET_USER_CART, 
    cartItems
  }
}

const _addToCart = (tea, itemQty = 1) => {
  console.log("TEA OBJECT>>>>>>>", tea)
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
    console.log("data in getUserCart", data)
    dispatch(_getUserCart(data))
  } catch (error) {
    console.error(error)
  }
}


//if guest (not logged in), adds to localstorage
//if logged in, makes axios request to api/carts/:teaid/:credential
export const addTeaToCart = (tea, isLoggedIn) => {
  return async (dispatch, getState) => {
    if (false) {
      dispatch(_addToCart(tea))
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
    } else {
      try {
        console.log("TEAID>>>>>>>>>", tea.id)
        console.log("CREDENTIAL>>>>>>>>>>", localStorage.token)
        const {data} = await axios.post(`/api/carts/${tea.id}/${localStorage.token}`)
        console.log("TEAS IN DATA", data.teas)
        dispatch(_addToCart(tea))
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
  console.log("STATE>>>>>>>>>>", state)
  console.log("ACTION", action)
  switch (action.type) {
    case SET_CART:
      return { ...state, cartItems: [...action.cartItems.teas] };
    //determines whether the item is already in cart
    //if yes, add action quantity to the quantity in cart
    //else, set state to include item  
    case ADD_TO_CART: {
      const itemInCart = state.cartItems.find((item) => {
        console.log('this is item in cart', itemInCart)
        return item.id === action.selectedTeas.id
      })
      if (itemInCart) {
        action.selectedTeas.itemQty +=itemInCart.itemQty
        return {
          ...state,
          cartItems: state.cartItems.teas.map((item) => {
            return item === existingItem ? action.selectedTeas : item
          })
        }
      } else {
        return {
          ...state, cartItems:  [...state.cartItems, action.selectedTeas]
        }
      }
      // return { ...state, cartItems: [...state.cartItems, action.selectedTeas ] };
    }
    default:
      return state;
  }
}
