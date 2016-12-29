import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Todo from '../components/Todo';
import * as todoActionCreators from '../actions/TodoActions';

class Home extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.shape({
      createTodo: PropTypes.func,
      editTodo: PropTypes.func,
      deleteTodo: PropTypes.func
    }),
  };

  // TODO: Rename to 'fetchData' (array of async action creators)
  static needs = [
    todoActionCreators.getTodos
  ];

  render() {
    return (
      <Todo
        todos={this.props.todos}
        actions={this.props.actions}
      />
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todo.items
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(todoActionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
