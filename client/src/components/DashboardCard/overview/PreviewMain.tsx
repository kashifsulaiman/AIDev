'use client';

import { BackArrowIcon } from '@/components/SVG';
import { StackblitzSettingPreview } from '@/constants/stackblitz';
import { PreviewMainInterface } from '@/types/interface';
import React, { useEffect } from 'react';
import sdk from '@stackblitz/sdk';
import { DiffCodeAndSendChanges } from '@/utils/stackblitz';
import { useStoreActions, useStoreState } from 'easy-peasy';

function PreviewMain({ handleViewChange, code }: PreviewMainInterface) {
  const updatedCode = useStoreState(
    (state: any) => state?.updatedCodeModel?.code
  );
  const setUpdatedCode = useStoreActions(
    (actions: any) => actions?.updatedCodeModel?.setUpdatedCode
  );

  useEffect(() => {
    if (code && typeof code === 'object') {
      setUpdatedCode(null);
      sdk.embedProject('preview', code, StackblitzSettingPreview);
    }
  }, [code]);

  useEffect(() => {
    if (updatedCode) {
      updateCodeFromLocal();
    }
  }, [updatedCode]);

  const updateCodeFromLocal = async () => {
    if (!updatedCode) {
      return;
    }
    const parsedData = JSON.parse(updatedCode);
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
    <div className="relative h-screen w-full overflow-x-hidden overflow-y-hidden bg-transparent">
      <div className="flex w-full items-end justify-end gap-4 p-2">
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
