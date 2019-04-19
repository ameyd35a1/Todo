import React, { Component } from "react";
import TodoList from "../components/TodoList/todoList";

export class TODO extends Component {
  state = {
    isLoading: false,
    todos: [],
    creating: false
  };

  componentWillMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    this.setState({ isLoading: true });

    const requestBody = {
      query: `
            query {
                todos {
                    _id
                    title
                    description
                    date
                    status
                    todoType
                }
            }
        `
    };

    fetch("http://localhost:3000/api", {
      type: "POST",
      data: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        this.setState({ todos: resData.data.todos, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  render() {
    return (
      <div>
        <CreateTodo />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default TODO;
