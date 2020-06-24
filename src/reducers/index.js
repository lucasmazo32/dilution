import { combineReducers } from 'redux';
import codeReducer from './code';
import trackReducer from './track';

export default combineReducers({
  codeReducer,
  trackReducer,
});
