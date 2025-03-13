// app/page.tsx
'use client'; // Mark this component as a client component

import React, { useState, useEffect } from 'react';
import TodoItem from '@/components/TodoItem';
import { loadTodos, saveTodos, Todo } from '@/utils/localStorage'; // Import Todo interface and functions

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]); // State is now explicitly typed as Todo[]
  const [newTodo, setNewTodo] = useState<string>(''); // State is now explicitly typed as string

  useEffect(() => {
    // Load todos from local storage on initial load
    const storedTodos = loadTodos();
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever todos state changes
    saveTodos(todos);
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = { // Explicitly type newTodoItem as Todo
        id: Date.now(), // Simple unique ID
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo(''); // Clear input field
    }
  };

  const handleToggleComplete = (id: number) => { // Type the id parameter
    const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => { // Type the id parameter
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
      <div className="container">
        <h1>My Todo List</h1>
        <div className="input-container">
          <input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddTodo(); }}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
              <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleComplete}
                  onDelete={handleDeleteTodo}
              />
          ))}
        </ul>
        {todos.length === 0 && <p className="empty-message">No todos yet. Add some!</p>}
      </div>
  );
}