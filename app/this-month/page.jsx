'use client';

import Layout from '@/components/Layout';
import TaskItem from '@/components/TaskItem';
import { useTodoStore } from '@/lib/store';

export default function ThisMonthPage() {
  const todos = useTodoStore((s) => s.todos);

  const now = new Date();
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // End of current month

  const filtered = todos.filter((t) => {
    if (!t.dueDate || t.parentId) return false;
    const due = new Date(t.dueDate);
    return due >= now && due <= monthEnd;
  });

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">📅 Tasks This Month</h1>
      {filtered.length === 0 ? (
        <p>No tasks due this month.</p>
      ) : (
        filtered.map((todo) => <TaskItem key={todo.id} todo={todo} />)
      )}
    </Layout>
  );
}
