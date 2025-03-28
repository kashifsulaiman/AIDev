'use client';

import React, { useEffect, useState } from 'react';

import TextArea from '../component/TextArea';

import Toptext from './Toptext';

import { useStoreState } from 'easy-peasy';

import { Resizable } from 're-resizable';
import { OverviewLeftInterface } from '@/types/interface';
import { StoreModel } from '@/redux/model';
import Messages from '../component/Messages';
import UploadImportProjectButton from '../component/UploadImportButton';

const OverviewLeft = ({ view }: OverviewLeftInterface) => {
  const { title, loader } = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const [generating, setGenerating] = useState(false);

  const [scanning, setScanning] = useState(false);

  const [finishing, setFinishing] = useState(false);

  const [isGenratingLoading, setIsGenratingLoading] = useState(true);
  const [isScanningLoading, setIsScanningLoading] = useState(false);
  const [isFinishingLoading, setIsFinishingLoading] = useState(false);

  useEffect(() => {
    setGenerating(true);

    const scanningTime = setTimeout(() => {
      setIsGenratingLoading(false);
      setIsScanningLoading(true);
      setScanning(true);
    }, 5000);

    const finishingTime = setTimeout(() => {
      setIsScanningLoading(false);
      setIsFinishingLoading(true);
      setFinishing(true);
    }, 10000);
    const finishingLoadingTime = setTimeout(() => {
      setIsFinishingLoading(false);
    }, 15000);

    return () => {
      clearTimeout(scanningTime);

      clearTimeout(finishingTime);
      clearTimeout(finishingLoadingTime);
    };
  }, []);

  return (
    <Resizable
      minWidth={400}
      style={{ display: view ? 'flex' : 'none' }}
      defaultSize={{
        width: '36%',
      }}
      maxWidth={'70%'}
      className="relative flex max-h-screen flex-col justify-around overflow-hidden px-3 pt-[21px] shadow-2xl max-sm:w-full md:px-11"
    >
      <h4 className="mb-8 text-2xl font-semibold text-black md:mb-16">
        {title}
      </h4>

      <div className="relative pb-12 md:pb-2">
        <div className="absolute right-0 top-0 z-[0] flex items-center gap-2">
          <UploadImportProjectButton />
        </div>

        {generating && (
          <Toptext
            text="Preparing Your Project Overview"
            loading={isGenratingLoading}
          />
        )}

        {scanning && (
          <Toptext
            text="Generating a Live Preview"
            loading={isScanningLoading}
          />
        )}

        {finishing && (
          <Toptext
            text="Finalizing and Displaying Content"
            loading={isFinishingLoading || loader}
          />
        )}
      </div>

      {loader && !conversation.messages.length ? (
        <div className="h-[550px]"></div>
      ) : (
        <>
          <Messages />
          <div className="mt-auto">
            <TextArea />
          </div>
        </>
      )}
    </Resizable>
  );
};

export default OverviewLeft;
