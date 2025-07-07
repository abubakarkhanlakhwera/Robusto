'use client';
import Layout from '@/components/Layout';
import TaskItem from '@/components/TaskItem';
import { useTodoStore } from '@/lib/store';
import React from 'react';

function TodayPage() {
  const todos = useTodoStore((s) => s.todos);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const filtered = todos.filter(
    (todo) => todo.dueDate && new Date(todo.dueDate) >= today && !todo.parentId
  );

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">📅 Tasks for Today</h1>
      {filtered.length === 0 ? (
        <p>No tasks due today.</p>
      ) : (
        filtered.map((todo) => <TaskItem key={todo.id} todo={todo} />)
      )}
    </Layout>
  );
}

export default TodayPage;
