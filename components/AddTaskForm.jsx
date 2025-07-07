'use client';

import { useTodoStore } from '@/lib/store';
import * as chrono from 'chrono-node';
import React, { useState } from 'react';

function AddTaskForm({ parentId = null }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const finalDate = dueDate ? new Date(dueDate).toISOString() : null;
    addTodo(text.trim(), finalDate, parentId);
    setText('');
    setDueDate('');
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center mb-4">
      <input
        type="text"
        placeholder={parentId ? 'Add subtask...' : 'Add a task...'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border px-3 py-2 rounded shadow-sm"
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border px-3 py-2 rounded shadow-sm"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}

export default AddTaskForm;
