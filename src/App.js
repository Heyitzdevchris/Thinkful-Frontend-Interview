import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  // ---------- useStates ----------
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  // ---------- useEffect ----------
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const userData = await response.json();

      setUsers(userData);
    }
    fetchUsers();
  }, []);

  // ---------- fetchTodos function -----------
  const fetchTodos = async (userId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    const todosData = await response.json();
    setTodos(todosData.slice(0, 10));
  };

  // ---------- JSX display ----------
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => fetchTodos(user.id)}>
            {user.name}
            <ul>
              {todos.map(
                (todo) =>
                  user.id === todo.userId && (
                    <li key={todo.id}>
                      <ul>{todo.title}</ul>
                      <p>{todo.completed ? "Completed" : "Incomplete"}</p>
                    </li>
                  )
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
