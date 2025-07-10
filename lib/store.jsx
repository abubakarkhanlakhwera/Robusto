'use client';

import { create } from 'zustand';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { useAuthStore } from './authStore';

export const useTodoStore = create((set, get) => ({
  todos: [],
  projects: [],

  // 🔁 Real‑time todos
  fetchTodos: () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
    return onSnapshot(q, (snap) => {
      set({ todos: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
    });
  },

  // 🔁 Real‑time projects
  fetchProjects: () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    const q = query(collection(db, 'projects'), where('userId', '==', user.uid));
    return onSnapshot(q, (snap) => {
      set({ projects: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
    });
  },

  // Todos CRUD
  addTodo: async (text, dueDate = null, parentId = null, projectId = null, completed = false) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const now = new Date();

    // Set default dueDate if none is provided (1 hour later)
    let finalDueDate = dueDate ? new Date(dueDate) : new Date(now.getTime() + 60 * 60 * 1000);

    // Prevent past dueDate
    if (finalDueDate < now) {
      alert('Cannot add a todo in the past.');
      return;
    }
    if (!user) return;
    await addDoc(collection(db, 'todos'), {
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate,
      parentId,
      projectId,
      userId: user.uid,
    });
  },
  toggleTodo: async (id) => {
    const t = get().todos.find((t) => t.id === id);
    if (!t) return;
    await updateDoc(doc(db, 'todos', id), { completed: !t.completed });
  },
  deleteTodo: async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  },
  editTodo: async (id, newText) => {
    await updateDoc(doc(db, 'todos', id), { text: newText });
  },
  getSubtasks: (id) => get().todos.filter((t) => t.parentId === id),

  // Projects CRUD + favorites + nesting
  addProject: async (name, color = '#3b82f6', parentId = null) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    // Enforce uniqueness
    const existing = get().projects.find(
      (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (existing) {
      throw new Error('Project names must be unique');
    }

    await addDoc(collection(db, 'projects'), {
      name: name.trim(),
      color,
      parentId,
      isFavorite: false,
      userId: user.uid,
      order: Date.now(),
    });
  },
  toggleFavorite: async (projectId) => {
    const p = get().projects.find((p) => p.id === projectId);
    if (!p) return;
    await updateDoc(doc(db, 'projects', projectId), {
      isFavorite: !p.isFavorite,
    });
  },
  deleteProject: async (id) => {
    await deleteDoc(doc(db, 'projects', id));
  },
  updateProject: async (id, payload) => {
    await updateDoc(doc(db, 'projects', id), payload);
  },
}));
