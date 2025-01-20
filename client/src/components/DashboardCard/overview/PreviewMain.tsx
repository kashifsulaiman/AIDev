'use client';

import { BackArrowIcon } from '@/components/SVG';
import { StackblitzSettingPreview } from '@/constants/stackblitz';
import { PreviewMainInterface } from '@/types/interface';
import React, { useEffect } from 'react';
import sdk from '@stackblitz/sdk';
import { DiffCodeAndSendChanges } from '@/utils/stackblitz';

function PreviewMain({ handleViewChange, code }: PreviewMainInterface) {
  useEffect(() => {
    if (code && typeof code === 'object') {
      localStorage.removeItem('proj-code');
      sdk.embedProject('preview', code, StackblitzSettingPreview);
    }
  }, [code]);

  useEffect(() => {
    if (localStorage.getItem('proj-code')) {
      updateCodeFromLocal();
    }
  }, [localStorage.getItem('proj-code')]);

  const updateCodeFromLocal = async () => {
    const localStorageCode = await localStorage.getItem('proj-code');
    if (!localStorageCode) {
      return;
    }
    const parsedData = JSON.parse(localStorageCode);
    const iframe = document.getElementById('preview') as HTMLIFrameElement;
    const vm = await sdk.connect(iframe);
    const codeSnapShot = await vm.getFsSnapshot();
    if (!codeSnapShot || !parsedData) {
      return;
    }
    const diff = await DiffCodeAndSendChanges(codeSnapShot, parsedData.files);
    await vm.applyFsDiff(diff);
  };

  return (
    <div className="relative h-screen w-full overflow-y-hidden bg-transparent">
      <div className="mb-2 flex items-end justify-end gap-4 p-2 pt-10 md:mb-0 md:justify-end md:pt-0">
        <div className="flex h-10 w-12 items-center justify-center rounded bg-custom-gradient p-2">
          <button className="text-2xl text-white" onClick={handleViewChange}>
            <BackArrowIcon />
          </button>
        </div>
      </div>
      <div className="w-full" style={{ height: '98vh' }}>
        <div className="h-full w-full" id="preview"></div>
      </div>
    </div>
  );
}

export default PreviewMain;
