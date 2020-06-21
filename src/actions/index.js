const action = {
  SET_CODE: 'SET CODE',
  DELETE_CODE: 'DELETE CODE',
  SET_TRACK: 'SET TRACK',
  DELETE_TRACK: 'DELETE TRACK',
};

const setCode = (code) => ({
  type: action.SET_CODE,
  payload: code,
});

const deleteCode = () => ({
  type: action.DELETE_CODE,
});

const setTrack = (track) => ({
  type: action.SET_TRACK,
  payload: track,
});

const deleteTrack = () => ({
  type: action.DELETE_TRACK,
});

export default { 
  action, setCode, deleteCode, setTrack, deleteTrack,
};
