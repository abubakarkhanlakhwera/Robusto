'use client';

import React, { useEffect } from 'react';

function NotificationSetup() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return null;
}

export default NotificationSetup;
