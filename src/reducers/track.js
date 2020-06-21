import actions from '../actions/index';

const { action } = actions;
const { SET_TRACK, DELETE_TRACK } = action;

export default function trackReducer(state = null, actionF) {
  switch (actionF.type) {
    case SET_TRACK:
      return actionF.payload;
    case DELETE_TRACK:
      return null;
    default:
      return state;
  }
}