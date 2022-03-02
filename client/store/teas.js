import axios from 'axios';

// ACTION TYPES
const SET_TEAS = 'SET_TEAS';
// const ADD_NEW_TEA = 'ADD_NEW_TEA';
// const UPDATE_TEA = 'UPDATE_TEA';
// const DELETE_TEA = 'DELETE_TEA';

// ACTION CREATORS
const setTeas = (teas) => ({
  type: SET_TEAS,
  teas
})

// const addNewTea = (tea) => ({
//   type: ADD_NEW_TEA,
//   tea
// })

// const _updateTea = (tea) => ({
//   type: UPDATE_TEA,
//   tea
// })

// const _deleteTea = (tea) => ({
//   type: DELETE_TEA,
//   tea
// })

// THUNK CREATORS
export const fetchAllTeas = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/teas');
      dispatch(setTeas(data));
    } catch (err) {
      console.log(err);
    }
  }
}

// export const createTea = (tea, history) => {
//   return async (dispatch) => {
//     try {
//       const { data: created } = await axios.post('/api/teas', tea);
//       dispatch(addNewTea(created));
//       history.push('/teas');
//     } catch (err) {
//       console.log('Unable to create tea', err)
//     }
//   }
// }

// export const updateTea = (tea, history) => {
//   return async (dispatch) => {
//     try {
//       const { data: updated } = await axios.put(`/api/teas/${tea.id}`, tea);
//       dispatch(_updateTea(updated));
//       history.push('/teas')
//     } catch (err) {
//       console.log('Update Failed', err)
//     }
//   }
// }

// export const deleteTea = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data: tea } = await axios.delete(`/api/teas/${id}`);
//       dispatch(_deleteTea(tea));
//     } catch (err) {
//       console.log('Delete Failed', err)
//     }
//   }
// }


// Initial State
const initialState = [];

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const teasReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAS:
      return action.teas;
    // case ADD_NEW_TEA:
    //   return [...state, action.tea];
    // case UPDATE_TEA:
    //   return state.map((tea) =>
    //   tea.id === action.tea.id ? action.tea : tea);
    // case DELETE_TEA:
    //   return state.filter((tea) => tea.id !== action.tea.id);
    default:
      return state;
  }
}

export default teasReducer;