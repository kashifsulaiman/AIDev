'use client';

import Loader from '@/Loader/loading';
import 'prismjs/themes/prism-dark.css';
import StackBlitzSDK from '@stackblitz/sdk';
import { useEffect, useRef } from 'react';
import { useStoreState } from 'easy-peasy';

const OverviewRight = () => {
  const {loader, code} = useStoreState((state: any) => state?.promptModel?.prompt);
  const sdkRef = useRef(null);
  useEffect(() => {
    if (code && sdkRef.current) {
      StackBlitzSDK.embedProject('embed', code, {
        height: 600,
        openFile: 'package.json',
        terminalHeight: 50,
        startScript: 'dev',
        hideDevTools: false,
        view: 'editor',
        theme: 'light',
      });
    }
  }, [code]);

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      {loader ? (
        <div className="flex size-full items-center justify-center">
          <div className="size-10">
            <Loader Color="#961CBE" />
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full overflow-y-auto bg-transparent">
          <div className="h-full w-full" id="embed" ref={sdkRef}></div>
        </div>
      )}
    </div>
  );
};

export default OverviewRight;
