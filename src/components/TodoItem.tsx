import React from 'react';
import { Todo } from '@/utils/localStorage'; // Import the Todo interface

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                id={`todo-${todo.id}`}
            />
            <label htmlFor={`todo-${todo.id}`} className={todo.completed ? 'completed' : ''}>
                {todo.text}
            </label>
            <button className="delete-button" onClick={() => onDelete(todo.id)}>
                Delete
            </button>
        </li>
    );
};

export default TodoItem;