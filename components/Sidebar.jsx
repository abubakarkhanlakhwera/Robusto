'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Bars3Icon,
  XMarkIcon,
  InboxIcon,
  CalendarDaysIcon,
  CalendarIcon,
  FolderIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useTodoStore } from '@/lib/store';
import SidebarProject from './SidebarProject';

const nav = [
  { label: 'Inbox', icon: InboxIcon, path: '/' },
  { label: 'Today', icon: CalendarIcon, path: '/today' },
  { label: 'This Week', icon: CalendarDaysIcon, path: '/this-week' },
  { label: 'This Month', icon: CalendarDaysIcon, path: '/this-month' },
  { label: 'Upcoming', icon: CalendarIcon, path: '/upcoming' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef();
  const [name, setName] = useState('');
  const addProject = useTodoStore((s) => s.addProject);
  const projects = useTodoStore((s) => s.projects);

  const favs = projects.filter((p) => p.isFavorite);
  const roots = projects.filter((p) => !p.parentId && !p.isFavorite);

  useEffect(() => {
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addProject(name.trim());
    setName('');
  };

  return (
    <>
      <div className="lg:hidden flex items-center bg-white px-4 py-2 shadow">
        <button onClick={() => setOpen(!open)}>
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        <span className="ml-4 font-semibold">Menu</span>
      </div>

      <nav
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white p-4 shadow-lg transform transition ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <h2 className="text-xl font-bold mb-6">📘 Robusto</h2>

        <ul className="space-y-3 mb-6">
          {nav.map(({ label, icon: I, path }) => (
            <li key={label}>
              <Link
                href={path}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <I className="w-5 h-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {favs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-yellow-600 mb-1">⭐ Favorites</h3>
            <ul className="space-y-1">
              {favs.map((p) => (
                <SidebarProject key={p.id} project={p} level={0} />
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Projects</h3>
          <ul className="space-y-1 mb-3">
            {roots.map((p) => (
              <SidebarProject key={p.id} project={p} level={0} />
            ))}
          </ul>
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              className="flex-1 border px-2 py-1 rounded text-sm"
              placeholder="New Project"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="text-blue-500">
              <PlusIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
