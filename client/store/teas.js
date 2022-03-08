import axios from 'axios';

// ACTION TYPES
const GET_ALL_TEAS = 'GET_ALL_TEAS';
const ADD_NEW_TEA = 'ADD_NEW_TEA';
const UPDATE_TEA = 'UPDATE_TEA';
const DELETE_TEA = 'DELETE_TEA';

// ACTION CREATORS
const setTeas = (teas) => ({
  type: GET_ALL_TEAS,
  teas,
});

const addNewTea = (tea) => ({
  type: ADD_NEW_TEA,
  tea,
});

const _updateTea = (tea) => ({
  type: UPDATE_TEA,
  tea,
});

const _deleteTea = (tea) => ({
  type: DELETE_TEA,
  tea,
});

// THUNK CREATORS
export const fetchAllTeas = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/teas');
      dispatch(setTeas(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createTea = (tea, history) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post('/api/teas/add', tea, {
        headers: {
          Authorization: window.localStorage.token,
        },
      });
      dispatch(addNewTea(created));
      history.push('/');
    } catch (err) {
      console.log('Unable to create tea', err);
    }
  };
};

export const updateTea = (tea, history) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/adminteas/${tea.id}`,
        tea,
        {
          headers: {
            Authorization: window.localStorage.token,
          },
        }
      );
      dispatch(_updateTea(updated));
      history.push('/adminteas')
    } catch (err) {
      console.log('Update Failed', err);
    }
  };
};

export const deleteTea = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/adminteas/${id}`);
      dispatch(fetchAllTeas());
      history.push('/adminteas');
    } catch (err) {
      console.log('Delete Failed', err);
    }
  };
};

// INITIAL STATE
const initialState = {
  allTeas: [],
  singleTea: {},
};

// REDUCER
export default function teasReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TEAS:
      return { ...state, allTeas: action.teas };
    case ADD_NEW_TEA:
      return { ...state, singleTea: action.tea };
    case UPDATE_TEA:
      return {
        ...state,
        allTeas: state.allTeas.map((tea) =>
          tea.id === action.tea.id ? action.tea : tea
        ),
      };
    case DELETE_TEA:
      return state.allTeas.filter((tea) => tea.id !== action.tea.id);
    default:
      return state;
  }
}
