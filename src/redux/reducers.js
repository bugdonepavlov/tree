import { combineReducers } from 'redux';
import listReducer from '../ducks/list';

export default combineReducers({
  list: listReducer,
});
