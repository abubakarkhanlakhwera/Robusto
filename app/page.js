'use client';

import Layout from '../components/Layout';
import AddTaskForm from '../components/AddTaskForm';
import TaskItem from '../components/TaskItem';
import { useTodoStore } from '../lib/store';
import { useState } from 'react';

export default function Page() {
  const [filter, setFilter] = useState('all');
  const allTodos = useTodoStore((s) => s.todos);
  const todos = allTodos.filter((t) => t.parentId === null);
  const now = Date.now();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active')
      return !todo.completed && (!todo.dueDate || new Date(todo.dueDate) > now);
    if (filter === 'completed') return todo.completed;
    if (filter === 'expired')
      return !todo.completed && todo.dueDate && new Date(todo.dueDate) < now;
    return true;
  });

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-6">
        <AddTaskForm />

        {/* Filter Buttons */}
        <div className="flex gap-2 my-4 justify-center">
          {['all', 'active', 'completed', 'expired'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Filtered Tasks */}
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <TaskItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
