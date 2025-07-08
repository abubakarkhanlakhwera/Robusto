'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const generateId = () => crypto.randomUUID();

export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],
      projects: [],

      addTodo: (text, dueDate = null, parentId = null, projectId = null) => {
        const newTodo = {
          id: generateId(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
          dueDate,
          parentId,
          projectId,
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
      addProject: (name) =>
        set((state) => ({
          projects: [...state.projects, { id: Date.now(), name }],
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          todos: state.todos.filter((t) => t.projectId !== id),
        })),

      updateProject: (id, newName) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, name: newName } : p)),
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
);
