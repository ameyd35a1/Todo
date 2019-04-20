import React, { Component } from 'react';
import TODO from './pages/todo';

import './App.css';

class App extends Component {
  state = {
    isLoading: false,
    todos: []
  };

  componentDidMount() {
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
            date
            description
            status
            todoType
          }
        }
      `
    };

    fetch('http://localhost:8000/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
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

  render() {
    return (
      <React.Fragment>
        <h1>ToDo List</h1>
        <h3>Todo Items:</h3>
        <TODO todos={this.state.todos} />
      </React.Fragment>
    );
  }
}

export default App;
