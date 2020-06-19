const action = {
  SET_CODE: 'SET CODE',
  DELETE_CODE: 'DELETE CODE',
};

const setCode = (code) => ({
  type: action.SET_CODE,
  payload: code,
});

const deleteCode = () => ({
  type: action.SET_CODE,
});

export default { action, setCode, deleteCode };
