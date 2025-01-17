'use client';

import StackBlitzSDK from '@stackblitz/sdk';
import React, { useEffect } from 'react';

function Page() {
  useEffect(() => {
    const localStorageData = localStorage.getItem('proj-code');
    if (!localStorageData) {
      return;
    }
    const data = JSON.parse(localStorageData);
    if (typeof data === 'object') {
      StackBlitzSDK.embedProject('embed', data, {
        height: 600,
        openFile: 'package.json',
        terminalHeight: 50,
        startScript: 'dev',
        hideDevTools: true,
        view: 'preview',
        theme: 'light',
        hideNavigation: true,
        hideExplorer: true,
        showSidebar: false,
      });
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-y-hidden bg-transparent">
      <div className="w-full" style={{ height: `calc(100vh + 32px)` }}>
        <div className="h-full w-full" id="embed"></div>
      </div>
    </div>
  );
}

export default Page;
