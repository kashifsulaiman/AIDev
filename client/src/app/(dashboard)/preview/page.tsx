'use client';

import StackBlitzSDK from '@stackblitz/sdk';
import React, { useEffect } from 'react';

function Page() {

  useEffect(() => {
    let LSD = localStorage.getItem('proj-code')
    if (!LSD) { return }
    let data = JSON.parse(LSD)
    console.log(typeof data)
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
        showSidebar: false
      });
    }
  }, [])

  return (
    <div className="h-screen w-full bg-transparent relative overflow-y-hidden" >
      <div className='w-full' style={{height:`calc(100vh + 32px)`}}>
        <div className="w-full h-full" id="embed"></div>
      </div>
    </div>
  );

}

export default Page;