import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const enhancer = applyMiddleware(thunk, logger);
const store = createStore(reducers, compose(enhancer));

export default store;
