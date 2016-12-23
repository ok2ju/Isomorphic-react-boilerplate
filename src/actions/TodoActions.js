import axios from 'axios';

// TODO: move into constants, create separate functions for API calls
const API_URL = 'http://localhost:9000/api/v1/todos';

export function createTodo(text) {
  return {
    type: 'CREATE_TODO',
    promise: axios.post(API_URL, text),
    text,
    date: Date.now()
  };
}

export function editTodo(id, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  };
}

export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    id
  };
}

export function getTodos() {
  return {
    type: 'GET_TODOS',
    promise: axios.get(API_URL)
  };
}
