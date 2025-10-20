'use client';

export default function TodoItem({ todo }) {
  return (
    <li
      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
    >
      <input
        type="checkbox"
        defaultChecked={todo.completed}
        className="w-5 h-5 cursor-pointer"
      />
      <span
        className={`flex-1 text-lg ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
        }`}
      >
        {todo.title}
      </span>
      <span className="text-sm text-gray-400">
        {new Date(todo.createdAt).toLocaleDateString()}
      </span>
    </li>
  );
}
