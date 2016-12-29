const initialState = {
  items: []
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_TODO':
      return state.concat(action.text);
    case 'GET_TODOS_SUCCESS':
      // Here app brokes because there is no actual data
      // return { ...state, items: state.items.concat(JSON.parse(action.result)) };
      return Object.assign({}, state, {
        items: JSON.parse(action.result)
      });
    default:
      return state;
  }
}
