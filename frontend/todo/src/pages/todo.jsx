import React, { Component } from "react";
import TodoList from "../components/TodoList/todoList";

class Todo extends Component {
  state = {
    isLoading: false,
    todos: []
  };

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    this.setState({ isLoading: true });

    const todos_temp = [
      {
        _id: "5cbadc54e1abbd30d4283150",
        title: "Take Medicine",
        description: "Take medicine prescribed",
        date: "02/02/2019",
        status: false,
        todoType: "Recursive"
      },
      {
        _id: "5cbadbe6e1abbd30d428314e",
        title: "Buy Milk",
        description: "Buy milk from store",
        date: "05/04/2019",
        status: true,
        todoType: "Normal"
      },
      {
        _id: "5cbadba5e1abbd30d428314c",
        title: "Pay Bills",
        description: "Pay mobile bills",
        date: "05/10/2019",
        status: false,
        todoType: "Normal"
      }
    ];
    this.setState({ todos: todos_temp, isLoading: false });
    return;

    const requestBody = {
      query: `
            query {
              todos {
                _id
                title
                date
                description
                status
                todoType
              }
            }
          `
    };

    fetch("http://localhost:8000/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        return data.json();
      })
      .then(resData => {
        this.setState({
          todos: resData.data.todos,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  changeStatus = (todoItemId, status) => {
    //call database to change status to true
    this.updateItem(todoItemId, { status: status });
  };

  updateItem = (id, itemAttributes) => {
    var index = this.state.todos.findIndex(x => x._id === id);
    if (index === -1) throw new Error("Exception");
    else
      this.setState({
        todos: [
          ...this.state.todos.slice(0, index),
          Object.assign({}, this.state.todos[index], itemAttributes),
          ...this.state.todos.slice(index + 1)
        ]
      });
  };

  render() {
    return (
      <React.Fragment>
        <h1>ToDo List</h1>
        <h3>Todo Items:</h3>
        <div>
          <TodoList todos={this.state.todos} changeStatus={this.changeStatus} />
        </div>
      </React.Fragment>
    );
  }
}

export default Todo;
