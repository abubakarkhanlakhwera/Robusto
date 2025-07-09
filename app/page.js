'use client';

import { useAuthStore } from '@/lib/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { useTodoStore } from '@/lib/store';
import TaskItem from '@/components/TaskItem';
import AddTaskForm from '@/components/AddTaskForm';

function formatTimeLeft(msLeft) {
  if (msLeft <= 0) return '❌ Expired';

  const totalSec = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  if (days > 5) return `📆 ${days} days left`;
  if (hours > 4) return `📅 ${days} day(s) left`;
  if (hours > 0) return `🕓 ${hours} hour(s) left`;
  if (mins > 0) return `⏳ ${mins}:${String(secs).padStart(2, '0')} left`;
  return `⏳ 0:${String(secs).padStart(2, '0')} left`;
}

function Countdown({ dueDate }) {
  // parse once
  const target = useMemo(() => new Date(dueDate).getTime(), [dueDate]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000); // tick every second
    return () => clearInterval(interval);
  }, []);

  const msLeft = target - now;
  return <p className="text-xs text-center text-gray-500 mt-1">{formatTimeLeft(msLeft)}</p>;
}

export default function Page() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const allTodos = useTodoStore((s) => s.todos);

  // only top‐level tasks
  const todos = useMemo(() => allTodos.filter((t) => t.parentId === null), [allTodos]);

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
    const unsub = fetchTodos();
    return () => unsub?.();
  }, [user, router, fetchTodos]);

  if (!user) return null;

  // current timestamp for filtering
  const now = Date.now();
  const filteredTodos = todos.filter((todo) => {
    const due = todo.dueDate ? new Date(todo.dueDate).getTime() : null;
    switch (filter) {
      case 'active':
        return !todo.completed && (!due || due > now);
      case 'completed':
        return todo.completed;
      case 'expired':
        return !todo.completed && due !== null && due <= now;
      default:
        return true;
    }
  });

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-6 px-4">
        <AddTaskForm />

        {/* Filter Buttons */}
        <div className="flex gap-2 my-4 justify-center flex-wrap">
          {['all', 'active', 'completed', 'expired'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <div key={todo.id}>
                <TaskItem todo={todo} />
                {todo.dueDate && <Countdown dueDate={todo.dueDate} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
