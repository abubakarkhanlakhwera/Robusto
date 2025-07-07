'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateId = () => crypto.randomUUID();

export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (text, dueDate = null, parentId = null) => {
        const newTodo = {
          id: generateId(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
          dueDate,
          parentId,
          subTask: [],
        };
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id && todo.parentId !== id),
        }));
      },
      editTodo: (id, newText) => {
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
        }));
      },
      getSubtasks: (id) => {
        return get().todos.filter((todo) => todo.parentId === id);
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);
