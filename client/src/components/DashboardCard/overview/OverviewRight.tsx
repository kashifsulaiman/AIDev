'use client';

import Loader from '@/Loader/loading';
import 'prismjs/themes/prism-dark.css';
import sdk from '@stackblitz/sdk';
import { useEffect } from 'react';
import { BackArrowIcon, CodeIcon } from '@/components/SVG';
import { StackblitzSettingMain } from '@/constants/stackblitz';
import { OverviewRightInterface } from '@/types/interface';

const OverviewRight = ({
  code,
  loader,
  handleViewChange,
  view,
}: OverviewRightInterface) => {
  useEffect(() => {
    if (code) {
      sdk.embedProject('embed', code, StackblitzSettingMain);
    }
  }, [code]);

  const togglePreview = async (param: 'default' | 'preview') => {
    const iframe = document.getElementById('embed') as HTMLIFrameElement;
    const vm = await sdk.connect(iframe);
    vm.editor.setView(param);
    vm.editor.showSidebar(param === 'preview' ? false : true);
    handleViewChange();
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-end justify-center overflow-hidden">
      <div className="flex w-full items-end justify-end gap-4 p-2">
        <div className="flex h-10 w-12 items-center justify-center rounded bg-custom-gradient p-2">
          {view ? (
            <button
              className="text-2xl text-white"
              onClick={() => togglePreview('default')}
            >
              <CodeIcon />
            </button>
          ) : (
            <button
              className="text-2xl text-white"
              onClick={() => togglePreview('preview')}
            >
              <BackArrowIcon />
            </button>
          )}
        </div>
      </div>

      {loader ? (
        <div className="flex size-full items-center justify-center">
          <div className="size-10">
            <Loader Color="#961CBE" />
          </div>
        </div>
      ) : (
        <div
          className="relative w-full bg-black"
          style={{
            height: !view ? `100%` : 'calc(95vh + 32px)',
            top: !view ? `0px` : '32px',
          }}
        >
          <div className="h-full w-full" id="embed"></div>
        </div>
      )}
    </div>
  );
};

export default OverviewRight;
