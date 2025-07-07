'use client';

import { useEffect, useState } from 'react';
import { useTodoStore } from '../lib/store';
import AddTaskForm from './AddTaskForm';
import {
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

export default function TaskItem({ todo }) {
  const [now, setNow] = useState(Date.now());
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [collapsed, setCollapsed] = useState(true);
  const [showAddSubtaskForm, setShowAddSubtaskForm] = useState(false);
  const [notified, setNotified] = useState(false);

  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const editTodo = useTodoStore((s) => s.editTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const getSubtasks = useTodoStore((s) => s.getSubtasks);
  const subtasks = getSubtasks(todo.id);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!todo.dueDate || notified) return;
    const timeLeft = new Date(todo.dueDate) - now;
    if (Notification.permission === 'granted' && timeLeft > 0 && timeLeft <= 60000) {
      new Notification('⏰ Task Expiring Soon!', {
        body: todo.text,
        icon: '/favicon.ico',
      });
      setNotified(true);
    }
  }, [now, todo.dueDate, notified, todo.text]);

  const handleEdit = () => {
    if (!text.trim()) return;
    editTodo(todo.id, text.trim());
    setIsEditing(false);
  };

  const isExpired = todo.dueDate && new Date(todo.dueDate) < now;
  const isCompleted = todo.completed;
  const isDone = isExpired || isCompleted;

  const msLeft = todo.dueDate ? new Date(todo.dueDate) - now : 0;
  const under5min = msLeft > 0 && msLeft <= 5 * 60 * 1000;

  return (
    <div className="space-y-1">
      <div
        onClick={() => !isDone && setCollapsed(!collapsed)}
        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
          isExpired ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50'
        } shadow-sm`}
      >
        <div className="flex items-center space-x-2">
          {/* Chevron toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isDone) setCollapsed((prev) => !prev);
            }}
            disabled={isDone}
            className={`transition text-gray-500 hover:text-gray-700 ${
              isDone ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>

          {/* Task text or input */}
          {isEditing ? (
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              onClick={(e) => e.stopPropagation()}
              className="w-full border-b focus:outline-none"
            />
          ) : (
            <p
              onClick={(e) => {
                e.stopPropagation();
                toggleTodo(todo.id);
              }}
              className={`flex-1 font-medium ${
                isExpired
                  ? 'line-through text-red-500'
                  : isCompleted
                    ? 'line-through text-gray-400'
                    : ''
              }`}
            >
              {todo.text}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* + Add Subtask */}
          {!isDone && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAddSubtaskForm((prev) => !prev);
                setCollapsed(false);
              }}
              title="Add Subtask"
              className="p-1 text-green-500 hover:text-green-700"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          )}

          {/* Edit / Save */}
          {isEditing ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              <CheckIcon className="w-5 h-5 text-green-600" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isDone) setIsEditing(true);
              }}
              disabled={isDone}
              title={isDone ? 'Cannot edit expired/completed task' : 'Edit task'}
              className={`${
                isDone ? 'opacity-40 cursor-not-allowed' : 'text-blue-500 hover:text-blue-700'
              }`}
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
          )}

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}
          >
            <TrashIcon className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Subtasks section */}
      {!collapsed && (
        <div className="ml-8 space-y-2 transition-all duration-200">
          {showAddSubtaskForm && <AddTaskForm parentId={todo.id} />}
          {subtasks.map((sub) => (
            <TaskItem key={sub.id} todo={sub} />
          ))}
        </div>
      )}
    </div>
  );
}
