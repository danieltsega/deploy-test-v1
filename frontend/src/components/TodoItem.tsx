// frontend/src/components/TodoItem.tsx
import { useState } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${todo.id}/`, {
        title,
        completed: todo.completed,
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleToggle = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${todo.id}/`, {
        title: todo.title,
        completed: !todo.completed,
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${todo.id}/`);
      onDelete();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md mb-2">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="h-5 w-5"
          />
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.title}</span>
        </div>
      )}
      <div className="space-x-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}