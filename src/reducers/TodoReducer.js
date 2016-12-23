export default function todoReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_TODO':
      return state.concat(action.text);
    case 'GET_TODOS':
      // Here app brokes because there is no actual data
      return state.concat(action.res.data);
    default:
      return state;
  }
}
