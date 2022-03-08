import axios from "axios";

// action type
const SET_CART = "SET_CART";
const GET_USER_CART = "GET_USER_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// action creator
const _setCart = (cartItems) => {
  return {
    type: SET_CART,
    cartItems,
  };
};

const _getUserCart = (cartItems) => {
  console.log(cartItems);
  return {
    type: GET_USER_CART,
    cartItems,
  };
};

const _addToCart = (tea, itemQty = 1) => {
  return {
    type: ADD_TO_CART,
    tea: { ...tea, itemQty },
  };
};

const _deleteFromCart = (tea) => {
  return {
    type: REMOVE_FROM_CART,
    tea
  };
};

// thunk
export const setCart = () => {
  return (dispatch) => {
    if (!localStorage.token && localStorage.cart) {
      dispatch(_setCart(JSON.parse(localStorage.getItem("cart"))));
    }
  };
};

export const getUserCart =
  (credential = localStorage.token) =>
  async (dispatch) => {
    try {
      //retrieve a users cart at '/api/carts/:credential
      const { data } = await axios.get(`/api/carts/${credential}`);
      console.log("USER CART DATA", data);
      dispatch(_getUserCart(data));
    } catch (error) {
      console.error(error);
    }
  };

//if guest (not logged in), adds to localstorage
//if logged in, makes axios request to api/carts/:teaid/:credential
export const addTeaToCart = (tea, isLoggedIn) => {
  return async (dispatch, getState) => {
    if (false) {
      dispatch(_addToCart(tea));
      localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    } else {
      try {
        const { data } = await axios.post(
          `/api/carts/${tea.id}/${localStorage.token}`
        );
        console.log(tea);
        dispatch(_addToCart(tea));
      } catch (error) {
        console.log(error);
      }
    }
  };
};

// export const deleteTeaFromCart = (tea) => {
//   console.log('this is tea',tea)
//   return async (dispatch) => {
//     try {
//       await axios.delete(
//         `/api/carts/${tea.cartteas.cartId}/${tea.cartteas.teaId}`
//       );
//       dispatch(_deleteFromCart(tea));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const removeTeaFromCart = (id, history) => {
  console.log('this is id', id)
  return async (dispatch) => {
    try {
      const { data: tea } = await axios.delete(`/api/carts/${id}`);
      dispatch(_deleteFromCart(tea));
      history.push('/carts');
    } catch (err) {
      console.log('Delete Failed', err)
    }
  }
}
//I didn't set up logged user vs guest

// reducer

const initialCartState = {
  numberOfItems: 0,
  subTotal: 0,
  cartItems: [],
};

export default function (state = initialCartState, action) {
  console.log("STATE>>>>>>>>>>", state.cartItems);
  console.log("ACTION", action);
  switch (action.type) {
    case SET_CART:
      return { ...state, cartItems: [...action.cartItems.teas] };

    case ADD_TO_CART: {
      console.log(action.tea);
      const itemInCart = state.cartItems.find((item) => {
        return item.id === action.tea.id;
      });
      if (itemInCart) {
        action.tea.itemQty += itemInCart.itemQty;
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            return item === itemInCart ? action.tea : item;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.tea],
        };
      }
    }
    case GET_USER_CART:
      // const teasInCart = [];

      // for (let i = 0; i < action.cartItems.teas.length; i++) {
      //   teasInCart.push({
      //     ...action.cartItems.teas[i],
      //     itemQty: action.cartItems.teas[i].carttea.itemQty,
      //     cartId: action.cartItems.teas[i].carttea.cartId,
      //     teaId: action.cartItems.teas[i].carttea.teaId
      //   })
      // }
      return {
        ...state,
        ...action.cartItems,
        cartItems: [...action.cartItems.teas],
      }
      case REMOVE_FROM_CART: {
        return {
          ...state, 
          cartItems: state.cartItems.filter(item=> item.id !==action.tea.id)
        }
      }

    default:
      return state;
  }
}
