import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_USER = 'GET_SINGLE_USER'

// ACTION CREATORS
export const setSingleUser = (user) => {
    return {
        type: GET_SINGLE_USER,
        user
    }
}

// THUNK CREATORS 
export const fetchSingleUser = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/users/${id}`)
            dispatch(setSingleUser(data))
        } catch(err) {
            console.error(err)
        }
    }
}

// INITIAL STATE
const initialState = {
    singleUser: {}
}

// SUB-REDUCER
export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SINGLE_USER:
            return {...state, singleUser: action.user}
    }
}
