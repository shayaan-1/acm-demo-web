'use client';

import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [input, setInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setSubmitting(true);
    try {
      await onAdd(input.trim());
      setInput('');
    } catch (err) {
      alert('Failed to create todo');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
        disabled={submitting}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
        disabled={submitting}
      >
        {submitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
