// frontend/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from '@/components/TodoItem';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/`);
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/`, {
        title: newTitle,
        completed: false,
      });
      setNewTitle('');
      fetchTodos();
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Todo App</h1>
        <form onSubmit={handleCreate} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add a new todo"
              className="border rounded px-3 py-2 flex-grow"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet.</p>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={fetchTodos}
                onDelete={fetchTodos}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}