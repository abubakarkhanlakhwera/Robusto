'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  if (!user) return null;

  return children;
}
