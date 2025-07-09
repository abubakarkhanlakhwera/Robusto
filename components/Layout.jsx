'use client';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationSetup from './NotificationSetup';
import { useTodoStore } from '@/lib/store';
import { useEffect } from 'react';

export default function Layout({ children, activeProjectName }) {
  const fetchProjects = useTodoStore((s) => s.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  return (
    <div>
      <NotificationSetup />
      <Sidebar />
      <div>
        <Header activeProjectName={activeProjectName} />
        <main>{children}</main>
      </div>
    </div>
  );
}
