'use client';

import React, { useEffect, useRef } from 'react';
import GenericImage from '@/common/GenericImage';
import { useStoreState } from 'easy-peasy';
import { StoreModel } from '@/redux/model';
import DotsLoader from './DotsLoader';
import { MessageInterface } from '@/redux/model/conversationModel';
import Loader from '@/Loader/loading';

const AiQuestions = () => {
  const { loader } = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const lastMsgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation.messages]);

  if (loader && conversation.messages.length < 0) {
    return (
      <div className="mt-10 flex size-full h-full items-center justify-center">
        <div className="size-20">
          <Loader Color="#961CBE" height="50px" width="50px" />
        </div>
      </div>
    );
  }
  return (
    <div className="Scroller-Class block w-full flex-col items-start gap-4 overflow-y-auto overflow-x-hidden pb-8 md:flex">
      {conversation.messages
        .filter((msg: MessageInterface, index: number) => {
          if (index === 0) return true;
          if (msg.isQuestion && msg.userPrompt === '')
            return index <= conversation.unansweredQuestionIndex;
          return true;
        })
        .map((msg: MessageInterface, index: number) => (
          <div
            className="relative mt-6 w-full"
            key={index}
            ref={index === conversation.messages.length - 1 ? lastMsgRef : null}
          >
            {msg.isQuestion && msg.aiResponse && msg.textResponse && (
              <div className="mr-20 flex flex-col items-start">
                <GenericImage
                  className="z-[3] mb-2 mt-2 w-6 md:mb-0"
                  alt="AC"
                  src="/asstes/images/ad-dashboard.png"
                  classNames={{ img: 'w-8' }}
                />

                <div className="leading-2 max-h-auto ml-8 w-full rounded-2xl rounded-ss-none bg-slate-100 p-4 font-Jakarta text-[16px] font-normal text-black">
                  {msg.textResponse ? msg.textResponse : msg.aiResponse}
                </div>
              </div>
            )}

            {msg.userPrompt && (
              <div className="ml-20 flex flex-col items-end">
                <GenericImage
                  className="z-[3] mb-2 mt-2 size-8 rounded-full md:mb-0"
                  alt="profile avatar"
                  src="/asstes/images/profile-avatar.jpg"
                  classNames={{ img: 'w-9' }}
                />
                <div className="leading-2 max-h-auto mr-8 w-[100%] rounded-2xl rounded-se-none bg-custom-purple p-4 font-Jakarta text-[16px] font-normal text-white">
                  {msg.userPrompt}
                </div>
              </div>
            )}

            {!msg.isQuestion && index !== 0 && (
              <div className="mr-20 flex flex-col items-start">
                <GenericImage
                  className="z-[3] mb-2 mt-2 w-6 md:mb-0"
                  alt="AC"
                  src="/asstes/images/ad-dashboard.png"
                  classNames={{ img: 'w-8' }}
                />
                {msg.aiResponse.length ? (
                  <div className="leading-2 max-h-auto ml-8 w-full rounded-2xl rounded-ss-none bg-slate-100 p-4 font-Jakarta text-[16px] font-normal text-black">
                    {msg.textResponse ? msg.textResponse : 'Done'}
                  </div>
                ) : (
                  loader && <DotsLoader />
                )}
              </div>
            )}
            <div ref={lastMsgRef}></div>
          </div>
        ))}
    </div>
  );
};

export default AiQuestions;
