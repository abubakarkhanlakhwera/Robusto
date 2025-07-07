'use client';
import React, { Children } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationSetup from './NotificationSetup';

function Layout({ children }) {
  return (
    <div>
      <NotificationSetup />
      <Sidebar />
      <div>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
