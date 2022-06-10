import React from "react";
import axios from "axios";
const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    error: "",
    userInput: "",
  };
  onInput = (evt) => {
    const { value } = evt.target;
    this.setState({ ...this.state, userInput: value });
  };
  postNewTodo = () => {
    axios
      .post(URL, { name: this.state.userInput })
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data),
        });
        this.setState({ ...this.state, userInput: "" });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };
  formSubmit = (evt) => {
    evt.preventDefault();
    this.postNewTodo();
  };

  fetchTodo = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };
  componentDidMount() {
    this.fetchTodo();
  }

  render() {
    return (
      <div>
        <h1>My To-Do's</h1>
        <p>{this.state.error}</p>
        <ul>
          {this.state.todos.map((todo) => {
            return <li key={todo.id}>{todo.name}</li>;
          })}
        </ul>
        <form id="todoForm" onSubmit={this.formSubmit}>
          <input
            value={this.state.userInput}
            onChange={this.onInput}
            placeholder="add an Item"
          />
          <button>Add Item</button>
        </form>
        <button>Clear</button>
      </div>
    );
  }
}
