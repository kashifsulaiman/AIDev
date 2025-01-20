'use client';

import Loader from '@/Loader/loading';
import 'prismjs/themes/prism-dark.css';
import sdk from '@stackblitz/sdk';
import { useEffect } from 'react';
import { CodeIcon } from '@/components/SVG';
import { StackblitzSettingMain } from '@/constants/stackblitz';

const OverviewRight = ({ code, loader, handleViewChange }: any) => {
  useEffect(() => {
    if (code) {
      localStorage.removeItem('proj-code');
      sdk.embedProject('embed', code, StackblitzSettingMain);
      localStorage.setItem('proj-code', JSON.stringify(code));
    }
  }, [code]);

  const getCodeAndRedirect = async () => {
    const iframe = document.getElementById('embed') as HTMLIFrameElement;
    const vm = await sdk.connect(iframe);
    const codeSnapShot = await vm.getFsSnapshot();
    const newCode = code;
    newCode.files = codeSnapShot;
    localStorage.setItem('proj-code', JSON.stringify(newCode));
    handleViewChange();
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-end justify-center">
      <div className="mb-2 flex items-end justify-end gap-4 p-2 pt-10 md:mb-0 md:justify-end md:pt-0">
        <div className="flex h-10 w-12 items-center justify-center rounded bg-custom-gradient p-2">
          <button className="text-2xl text-white" onClick={getCodeAndRedirect}>
            <CodeIcon />
          </button>
        </div>
      </div>

      {loader ? (
        <div className="flex size-full items-center justify-center">
          <div className="size-10">
            <Loader Color="#961CBE" />
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full overflow-y-auto bg-transparent">
          <div className="h-full w-full" id="embed"></div>
        </div>
      )}
    </div>
  );
};

export default OverviewRight;
