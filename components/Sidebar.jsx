'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const sidebarRef = useRef();
  const [projectName, setProjectName] = useState('');
  const addProject = useTodoStore((s) => s.addProject);
  const projects = useTodoStore((s) => s.projects);

  // Close sidebar if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;
    addProject(projectName.trim());
    setProjectName('');
  };

  return (
    <>
      {/* Mobile Menu Button */}
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

        {/* Main Nav Links */}
        <ul className="space-y-3 mb-6">
          {navItems.map(({ label, icon: Icon, path }) => (
            <Link key={label} href={path}>
              <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </li>
            </Link>
          ))}
        </ul>

        {/* Projects Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Projects</h3>
          <ul className="space-y-2 mb-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer ml-2 text-sm">
                  📁 {project.name}
                </li>
              </Link>
            ))}
          </ul>

          {/* Add Project Input */}
          <form onSubmit={handleAddProject} className="flex items-center gap-2">
            <input
              className="border px-2 py-1 rounded text-sm w-full"
              placeholder="New Project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button type="submit" className="text-blue-500">
              <PlusIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
