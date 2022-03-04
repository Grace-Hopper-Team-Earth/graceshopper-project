import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleTeaReducer from './singleTea';
import usersReducer from './users';
import teasReducer from './teas';
import cartReducer from './cart';

const reducer = combineReducers({
  auth,
  users: usersReducer,
  singleTea: singleTeaReducer,
  allTeas: teasReducer,
  cart: cartReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
