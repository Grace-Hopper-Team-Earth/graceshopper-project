import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_USER = 'GET_SINGLE_USER';
const GET_ALL_USERS = 'GET_ALL_USERS';
const UPDATE_USER = 'UPDATE_USER';

// ACTION CREATORS
export const setSingleUser = (user) => {
    return {
        type: GET_SINGLE_USER,
        user
    }
}

export const setAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}

// THUNK CREATORS 
export const fetchSingleUser = (id) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token');

            if (token) {
                const { data } = await axios.get(`/api/users/${id}`, {
                    headers: {
                        authorization: token
                    }
                });
                dispatch(setSingleUser(data))
            }
        } catch(err) {
            console.error(err)
        }
    }
}

export const fetchAllUsers = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token');

            if (token) {
                const { data } = await axios.get('/api/users', {
                    headers: {
                        authorization: token
                    }
                });
                dispatch(setAllUsers(data))
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export const _updateUser = (user) => {
    return async (dispatch) => {
        try {   
            const { data } = await axios.put(`/api/users/${user.id}`, user)
            dispatch(updateUser(data))
        } catch(err) {
            console.error(err)
        }
    }
}

// INITIAL STATE
const initialState = {
    singleUser: {},
    allUsers: []
}

// SUB-REDUCER
export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SINGLE_USER:
            return {...state, singleUser: action.user}
        case GET_ALL_USERS:
            return {...state, allUsers: action.users}
        case UPDATE_USER:
            return {
                ...state,
                singleUser: action.user
            }
        default: 
            return state
    }
}
