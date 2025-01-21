'use client';

import Loader from '@/Loader/loading';
import 'prismjs/themes/prism-dark.css';
import sdk from '@stackblitz/sdk';
import { useEffect } from 'react';
import { CodeIcon } from '@/components/SVG';
import { StackblitzSettingMain } from '@/constants/stackblitz';
import { useStoreActions } from 'easy-peasy';

const OverviewRight = ({ code, loader, handleViewChange }: any) => {
  const setUpdatedCode = useStoreActions(
    (actions: any) => actions?.updatedCodeModel?.setUpdatedCode
  );

  useEffect(() => {
    if (code) {
      setUpdatedCode(null);
      sdk.embedProject('embed', code, StackblitzSettingMain);
      setUpdatedCode(JSON.stringify(code));
    }
  }, [code]);

  const getCodeAndSaveInLocal = async () => {
    const iframe = document.getElementById('embed') as HTMLIFrameElement;
    const vm = await sdk.connect(iframe);
    const codeSnapShot = await vm.getFsSnapshot();
    const newCode = code;
    newCode.files = codeSnapShot;
    setUpdatedCode(JSON.stringify(newCode));
  };

  const handleShowPreview = () => {
    getCodeAndSaveInLocal();
    handleViewChange();
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-end justify-center">
      <div className="flex w-full items-end justify-end gap-4 p-2">
        <div className="flex h-10 w-12 items-center justify-center rounded bg-custom-gradient p-2">
          <button className="text-2xl text-white" onClick={handleShowPreview}>
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
