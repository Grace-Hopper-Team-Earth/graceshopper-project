import axios from 'axios';

// action type

const GOT_SINGLE_TEA = 'GOT_SINGLE_TEA';

// action creators
const gotSingleTea = (tea) => {
  return {
    type: GOT_SINGLE_TEA,
    tea,
  };
};

// thunk creators

export const fetchSingleTea = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/teas/${id}`);
    console.log('this is data in thunk', data)
    dispatch(gotSingleTea(data));
  };
};

const initialState = {singleTea: {}}

// reducer
const singleTeaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SINGLE_TEA:
      return {...state, singleTea: action.tea};
    default:
      return state;
  }
};

export default singleTeaReducer;
