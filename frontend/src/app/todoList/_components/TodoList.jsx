'use client';

import { useState, useEffect } from 'react';
import { fetchTodos, createTodo } from '../../../../lib/todoService';
import TodoItem from '../../components/TodoList/TodoItem';
import TodoForm from '../../components/TodoList/TodoForm';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(title) {
    try {
      const newTodo = await createTodo(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            My Todo List
          </h1>

          <TodoForm onAdd={addTodo} />

          {loading && (
            <p className="text-center text-gray-500 py-8">Loading todos...</p>
          )}

          {!loading && todos.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              No todos yet. Add one to get started!
            </p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
              ))}
            </ul>
          )}

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
