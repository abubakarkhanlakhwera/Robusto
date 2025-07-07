'use client';

import Layout from '@/components/Layout';
import TaskItem from '@/components/TaskItem';
import { useTodoStore } from '@/lib/store';

export default function ThisWeekPage() {
  const todos = useTodoStore((s) => s.todos);

  const now = new Date();
  const weekEnd = new Date();
  weekEnd.setDate(now.getDate() + (7 - now.getDay())); // End of current week
  weekEnd.setHours(23, 59, 59, 999);

  const filtered = todos.filter((t) => {
    if (!t.dueDate || t.parentId) return false;
    const due = new Date(t.dueDate);
    return due >= now && due <= weekEnd;
  });

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">🗓️ Tasks This Week</h1>
      {filtered.length === 0 ? (
        <p>No tasks due this week.</p>
      ) : (
        filtered.map((todo) => <TaskItem key={todo.id} todo={todo} />)
      )}
    </Layout>
  );
}
