import axios from 'axios';
import CarAPI from '~/src/api/car';

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

export function getTodos() {
  return {
    types: ['GET_TODOS_REQUEST', 'GET_TODOS_SUCCESS', 'GET_TODOS_FAILURE'],
    promise: CarAPI.getCars()
  };
}
