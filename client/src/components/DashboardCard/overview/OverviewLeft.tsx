'use client';

import GenericImage from '@/common/GenericImage';

import React, { useEffect, useState, useRef } from 'react';

import TextArea from '../component/TextArea';

import Toptext from './Toptext';

import { useStoreState } from 'easy-peasy';

import { Resizable } from 're-resizable';

const OverviewLeft = () => {
  const { title, loader } = useStoreState(
    (state: any) => state?.promptModel?.prompt
  );
  const conversation = useStoreState(
    (state: any) => state?.conversationModel?.conversation
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
  const lastMsgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation.messages]);

  return (
    <Resizable
      minWidth={300}
      defaultSize={{
        width: '50%',
      }}
      className="flex max-h-screen flex-col justify-around overflow-hidden px-3 pt-[21px] shadow-2xl max-sm:w-full md:px-11"
    >
      <h4 className="mb-8 text-2xl font-semibold text-black md:mb-16">
        {title}
      </h4>

      <div className="pb-12 md:pb-2">
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

      {loader && conversation.messages.length < 0 ? (
        <div className="h-[550px]"></div>
      ) : (
        <>
          <div className="Scroller-Class block h-screen flex-col items-start gap-2 overflow-y-auto md:flex">
            {conversation.messages.map((msg: any, index: number) => (
              <div
                key={index}
                ref={
                  index === conversation.messages.length - 1 ? lastMsgRef : null
                }
              >
                <GenericImage
                  className="z-[3] mb-2 mt-2 h-5 w-8 md:mb-0"
                  alt="AC"
                  src="/asstes/images/ad-dashboard.png"
                  classNames={{
                    img: 'w-auto',
                  }}
                />
                <div className="leading-2 max-h-auto w-[100%] font-Jakarta text-[16px] font-normal text-black">
                  {/* <TypingEffect speed={10}>{msg.content}</TypingEffect> */}
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <TextArea />
          </div>
        </>
      )}
    </Resizable>
  );
};

export default OverviewLeft;
