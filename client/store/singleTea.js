import axios from 'axios';

// action type

const GOT_SINGLE_TEA = 'GOT_SINGLE_TEA';

// Action Creators
const gotSingleTea = (tea) => {
  return {
    type:GOT_SINGLE_TEA,
    tea
  }
}

// Thunk Creators

export const fetchSingleTea = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/teas/${id}`);
    console.log('this is data in thunk', data)
    dispatch(gotSingleTea(data));
  };
};

// Initial State
const initialState = {
  singleTea: {}
}

// Reducer
export default function singleTeaReducer (state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_TEA:
      return {...state, singleTea: action.tea};
    default:
      return state;
  }
};
