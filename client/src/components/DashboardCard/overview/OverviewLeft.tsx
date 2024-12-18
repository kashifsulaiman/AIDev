'use client';

import GenericImage from '@/common/GenericImage';

import React, { useEffect, useState } from 'react';

import TextArea from '../component/TextArea';

import Toptext from './Toptext';

import { useStoreState } from 'easy-peasy';

import TypingEffect from '@/components/TypingEffect';

const OverviewLeft = ({ content, loader }: any) => {
  const prompt = useStoreState((state: any) => state?.promptModel?.prompt);
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
    <div className="overflow=-y-auto flex h-screen flex-col justify-around px-3 pt-[21px] shadow-2xl md:px-11">
      <h4 className="mb-8 text-2xl font-semibold text-black md:mb-16">
        {prompt?.title}
      </h4>

      <div className="pb-12 md:pb-20">
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

      {loader ? (
        <div className="h-[550px]"></div>
      ) : (
        <>
          <div className="Scroller-Class block h-screen items-start gap-2 overflow-y-auto md:flex">
            <GenericImage
              className="z-[3] mb-2 mt-2 h-5 w-8 md:mb-0"
              alt="AC"
              src="/asstes/images/ad-dashboard.png"
              classNames={{
                img: 'w-auto',
              }}
            />
            <div className="leading-2 max-h-[459px] w-[100%] font-Jakarta text-[16px] font-normal text-black">
              <TypingEffect speed={10}>{content ? content : null}</TypingEffect>
            </div>
          </div>

          <div className="mt-auto">
            <TextArea readOnly />
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewLeft;
