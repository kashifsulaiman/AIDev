'use client';

import { StackblitzSettingPreview } from '@/constants/stackblitz';
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
      StackBlitzSDK.embedProject('embed', data, StackblitzSettingPreview);
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
