'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bars3Icon,
  XMarkIcon,
  InboxIcon,
  CalendarDaysIcon,
  CalendarIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Inbox', icon: InboxIcon, path: '/' },
  { label: 'Today', icon: CalendarIcon, path: '/today' },
  { label: 'This Week', icon: CalendarDaysIcon, path: '/this-week' },
  { label: 'This Month', icon: CalendarDaysIcon, path: '/this-month' },
  { label: 'Upcoming', icon: CalendarIcon, path: '/upcoming' },
  { label: 'Projects', icon: FolderIcon, path: '/projects' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden flex items-center bg-white px-4 py-2 shadow">
        <button onClick={() => setOpen(!open)}>
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        <span className="ml-4 font-semibold">Menu</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg p-4 transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:translate-x-0 lg:static lg:block`}
      >
        <h2 className="text-xl font-bold mb-6">📘 Todoist Clone</h2>
        <ul className="space-y-3">
          {navItems.map(({ label, icon: Icon, path }) => (
            <Link key={label} href={path}>
              <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </aside>
    </>
  );
}
