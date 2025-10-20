'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert('Please enter a todo');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/todos`, {
        title: input,
      });
      setTodos([response.data, ...todos]);
      setInput('');
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            My Todo List
          </h1>

          {/* Form */}
          <form onSubmit={addTodo} className="mb-8 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Add
            </button>
          </form>

          {/* Loading State */}
          {loading && (
            <p className="text-center text-gray-500 py-8">Loading todos...</p>
          )}

          {/* Todo List */}
          {!loading && todos.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              No todos yet. Add one to get started!
            </p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span
                    className={`flex-1 text-lg ${
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-700'
                    }`}
                  >
                    {todo.title}
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Summary */}
          {todos.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Total todos: <span className="font-bold">{todos.length}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}