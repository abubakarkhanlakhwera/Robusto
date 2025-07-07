'use client';
import Layout from '@/components/Layout';
import TaskItem from '@/components/TaskItem';
import { useTodoStore } from '@/lib/store';
import React from 'react';

function UpcomingPage() {
  const todos = useTodoStore((s) => s.todos);
  const now = new Date();

  const filtered = todos.filter((t) => t.dueDate && new Date(t.dueDate) > now && !t.parentId);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">📆 Upcoming Tasks</h1>
      {filtered.length === 0 ? (
        <p>No upcoming tasks.</p>
      ) : (
        filtered.map((todo) => <TaskItem key={todo.id} todo={todo} />)
      )}
    </Layout>
  );
}

export default UpcomingPage;
