import React from "react";
import TodoItem from "./TodoItem/todoItem";

const TodoList = props => {
  const todos = props.todos.map(todo => {
    return (
      <TodoItem
        key={todo._id}
        title={todo.title}
        description={todo.description}
        date={todo.date}
        status={todo.status}
        type={todo.todoType}
      />
    );
  });

  return <ul>{todos}</ul>;
};

export default TodoList;
