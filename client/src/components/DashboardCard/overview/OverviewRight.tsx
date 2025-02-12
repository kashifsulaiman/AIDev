'use client';

import Loader from '@/Loader/loading';
import 'prismjs/themes/prism-dark.css';
import StackBlitzSDK from '@stackblitz/sdk';
import { useEffect, useRef, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { OverviewRightInterface } from '@/types/interface';
import { BackArrowIcon, CodeIcon } from '@/components/SVG';
import { StackblitzSettingMain } from '@/constants/stackblitz';
import { StoreModel } from '@/redux/model';
import { DiffCodeAndSendChanges } from '@/utils/stackblitz';

const OverviewRight = ({ handleViewChange, view }: OverviewRightInterface) => {
  const { loader, code } = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );

  const sdkRef = useRef(null);
  const [firstInstance, setFirstInstance] = useState<boolean>(false);

  useEffect(() => {
    if (code && sdkRef.current && !firstInstance) {
      StackBlitzSDK.embedProject('embed', code, StackblitzSettingMain);
      setFirstInstance(true);
    } else if (code && sdkRef.current) {
      handleCheckDependencyAndCreateInstance();
    }
  }, [code]);

  const handleCheckDependencyAndCreateInstance = async () => {
    const iframe = document.getElementById('embed') as HTMLIFrameElement;
    const vm = await StackBlitzSDK.connect(iframe);
    const oldCode = await vm.getFsSnapshot();
    if (!oldCode) {
      return;
    }
    const updatedCode = DiffCodeAndSendChanges(oldCode, code.files);
    if (updatedCode.create['package.json']) {
      StackBlitzSDK.embedProject('embed', code, StackblitzSettingMain);
    } else {
      vm.applyFsDiff(updatedCode);
    }
  };

  const togglePreview = async (param: 'default' | 'preview') => {
    const iframe = document.getElementById('embed') as HTMLIFrameElement;
    const vm = await StackBlitzSDK.connect(iframe);
    vm.editor.setView(param);
    vm.editor.showSidebar(param !== 'preview');
    handleViewChange();
  };

  return (
    <div className="relative flex h-full min-h-screen w-full overflow-hidden">
      {loader && !firstInstance ? (
        <div className="flex size-full items-center justify-center">
          <div className="size-10">
            <Loader Color="#961CBE" />
          </div>
        </div>
      ) : (
        <>
          <div className="absolute right-6 top-4 z-10 flex items-end justify-end gap-4 rounded-lg border-4 border-white">
            <div className="group relative flex size-8 items-center justify-center rounded bg-custom-gradient p-2">
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

              <div className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 scale-0 transform rounded bg-gray-800 p-1 text-xs text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                {view ? `Code` : `Back`}
              </div>
            </div>
          </div>
          <div
            className="relative w-full bg-black"
            style={{
              height: 'calc(100vh + 32px)',
            }}
          >
            <div className="h-full w-full" id="embed" ref={sdkRef}></div>
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewRight;
