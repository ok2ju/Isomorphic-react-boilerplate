import React, { PropTypes } from 'react';

const Todo = ({ todos = [], actions }) => (
  <div>
    <h1>Todos Title</h1>
    <ul>
      {todos.map((todo, index) =>
        <li key={index}>
          <a onClick={actions.getTodos()}>{todo.title}</a>
        </li>)}
    </ul>
  </div>
);

Todo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.shape({
    createTodo: PropTypes.func,
    editTodo: PropTypes.func,
    deleteTodo: PropTypes.func
  })
};

export default Todo;
