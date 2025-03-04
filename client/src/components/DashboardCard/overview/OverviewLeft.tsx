'use client';

import GenericImage from '@/common/GenericImage';

import React, { useEffect, useState, useRef } from 'react';

import TextArea from '../component/TextArea';

import Toptext from './Toptext';

import { useStoreActions, useStoreState } from 'easy-peasy';

import { Resizable } from 're-resizable';
import { OverviewLeftInterface } from '@/types/interface';
import { StoreModel } from '@/redux/model';
import { RollbackIcon } from '@/components/SVG';
import { MessageInterface } from '@/redux/model/conversationModel';
import { useMutation } from '@/hooks/useMutation';
import { POST } from '@/hooks/consts';
import { ApiUrl } from '@/constants/apiUrl';
import DotsLoader from '../component/DotsLoader';
import ModelSelector from '../component/ModelDropdown';

const OverviewLeft = ({ view }: OverviewLeftInterface) => {
  const { title, loader, code } = useStoreState<StoreModel>(
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
  const setPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.setPrompt
  );
  const { setConversation } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );

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

  const { mutate } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.ROLLBACK_MESSAGE,
    onSuccess: (res) => {
      const { messages } = res.data;
      const message = messages[messages.length - 1];
      setConversation({ messages });
      const newPrompt = {
        code: message.code,
        content: message.userPrompt,
      };
      setPrompt(newPrompt);
    },
  });

  const handleRollback = (project: MessageInterface) => {
    if (!conversation.conversationId && !project) return;
    const mutationInput = {
      conversationId: conversation.conversationId,
      messageId: project._id.toString(),
    };
    mutate(mutationInput);
  };

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


      <div className='flex items-start gap-2 flex-wrap w-full justify-between pb-12 md:pb-2'>
        <div className="">
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

        {/* <div className=""> */}
          <ModelSelector />
        {/* </div> */}
      </div>

      {loader && conversation.messages.length < 0 ? (
        <div className="h-[550px]"></div>
      ) : (
        <>
          <div className="Scroller-Class block h-screen w-full flex-col items-start gap-4 overflow-y-auto overflow-x-hidden pb-8 md:flex">
            {conversation.messages.map(
              (msg: MessageInterface, index: number) => (
                <div
                  className="relative mt-6 w-full"
                  key={index}
                  ref={
                    index === conversation.messages.length - 1
                      ? lastMsgRef
                      : null
                  }
                >
                  <div className="ml-20 flex flex-col items-end">
                    <GenericImage
                      className="z-[3] mb-2 mt-2 size-8 rounded-full md:mb-0"
                      alt="profile avatar"
                      src="/asstes/images/profile-avatar.jpg"
                      classNames={{
                        img: 'w-9',
                      }}
                    />
                    <div className="leading-2 max-h-auto mr-8 w-[100%] rounded-2xl rounded-se-none bg-custom-purple p-4 font-Jakarta text-[16px] font-normal text-white">
                      {/* <TypingEffect speed={10}>{msg.content}</TypingEffect> */}
                      {msg.userPrompt}
                    </div>
                  </div>
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
                  {conversation.messages &&
                    !loader &&
                    code &&
                    conversation.messages.length &&
                    !(code === msg.code) && (
                      <div className="group absolute -bottom-4 right-10 flex size-8 cursor-pointer items-center justify-center rounded bg-custom-gradient p-1.5 transition-colors duration-200 hover:opacity-90">
                        <button
                          className="text-white"
                          onClick={() => {
                            handleRollback(msg);
                          }}
                        >
                          <RollbackIcon classes="size-6" />
                        </button>
                        <div className="absolute -top-10 left-1/2 mt-2 w-max -translate-x-1/2 scale-0 transform rounded bg-gray-800 p-1 text-xs text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                          Rollback
                        </div>
                      </div>
                    )}
                </div>
              )
            )}
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
