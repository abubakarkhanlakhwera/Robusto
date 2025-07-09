'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../lib/authStore';

export default function AuthProvider({ children }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return children;
}
