'use client';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationSetup from './NotificationSetup';

export default function Layout({ children, activeProjectName }) {
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
