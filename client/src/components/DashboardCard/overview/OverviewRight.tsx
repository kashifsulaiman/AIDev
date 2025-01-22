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
    vm.editor.showSidebar(param !== 'preview');
    handleViewChange();
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-end justify-center overflow-hidden">
      <div className="flex w-full items-end justify-end gap-4 p-2">
        <div className="group relative flex h-10 w-12 items-center justify-center rounded bg-custom-gradient p-2">
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

          <div className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 scale-0 transform rounded bg-gray-800 p-2 text-sm text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            {view ? `Code` : `Back`}
          </div>
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
            height: view ? 'calc(95vh + 32px)' : `100%`,
            top: view ? `32px` : '32px',
          }}
        >
          <div className="h-full w-full" id="embed"></div>
        </div>
      )}
    </div>
  );
};

export default OverviewRight;
