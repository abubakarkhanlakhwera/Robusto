'use client';

import { useTodoStore } from '@/lib/store';
import React, { useState } from 'react';

function AddTaskForm({ parentId = null, projectId = null }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const now = new Date();
    let finalDate;

    if (dueDate) {
      const selectedDate = new Date(dueDate);
      if (selectedDate < now) {
        alert('Cannot select a past date/time.');
        return;
      }
      finalDate = selectedDate.toISOString();
    } else {
      finalDate = new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // default: +1 hour
    }

    await addTodo(text.trim(), finalDate, parentId, projectId);

    setText('');
    setDueDate('');
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
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
        min={getMinDateTime()}
        className="border px-3 py-2 rounded shadow-sm"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}

export default AddTaskForm;
