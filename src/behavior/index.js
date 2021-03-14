import { applyMiddleware, createStore, combineReducers } from 'redux';
import reducer from './weather';
import thunk from 'redux-thunk';
import * as utils from './utils';

const rootReducer = combineReducers(reducer);

const store = createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument(utils.api))
);

window.store = store;

export default store;
