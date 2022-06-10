import React from "react";
import axios from "axios";
const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
  };
  fetchTodo = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => {
        debugger;
      });
  };
  componentDidMount() {
    this.fetchTodo();
  }

  render() {
    return (
      <div>
        <h1>My To-Do's</h1>
        <ul>
          {this.state.todos.map((todo) => {
            return <li key={todo.id}>{todo.name}</li>;
          })}
        </ul>
        <form>
          <input />
          <button>Add Item</button>
        </form>
        <button>Clear</button>
      </div>
    );
  }
}
