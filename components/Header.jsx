'use client';

import { useAuthStore } from '../lib/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useTodoStore } from '@/lib/store';
import Link from 'next/link';

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const pathname = usePathname();
  const projects = useTodoStore((s) => s.projects);
  const currentProjectId = pathname.includes('/projects/') ? pathname.split('/projects/')[1] : null;
  const router = useRouter();

  return (
    <header className="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">📝 My Tasks</h1>
      {projects.map((p) => (
        <Link
          href={`/projects/${p.id}`}
          key={p.id}
          className={`px-3 py-1 rounded ${currentProjectId === p.id ? 'bg-blue-100 text-blue-600' : ''}`}
        >
          {p.name}
        </Link>
      ))}
      {user && (
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{user.displayName || user.email}</span>
          </div>

          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full border"
              referrerPolicy="no-referrer"
            />
          ) : (
            <UserCircleIcon className="w-8 h-8 text-blue-500" />
          )}

          <button
            onClick={logout}
            className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
