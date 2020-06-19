import actions from '../actions/index';

const { action } = actions;
const { SET_CODE, DELETE_CODE } = action;

export default function codeReducer(state = null, actionF) {
  switch (actionF.type) {
    case SET_CODE:
      return actionF.payload;
    case DELETE_CODE:
      return null;
    default:
      return state;
  }
}
