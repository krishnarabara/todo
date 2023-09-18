import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState();


  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setNewTodo('');
    }
  };


  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };


  const handleCheck = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };


  const handleFilter = (value) => {
    setFilter(value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'checked') {
      return todo.checked;
    } else if (filter === 'unchecked') {
      return !todo.checked;
    }
    return true; // 'all' filter or invalid filter
  });


  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTodo} onChange={handleInputChange} />
        <button type="submit">Ok</button>
      </form>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleCheck(index)}
            />
            {todo.text}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handleFilter('checked')}>Checked</button>
        <button onClick={() => handleFilter('unchecked')}>Unchecked</button>
        <button onClick={() => handleFilter('all')}>All</button>
      </div>
    </div>
  );
}

 export default App;

