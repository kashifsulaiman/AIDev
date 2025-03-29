'use client';

import React, { useEffect, useRef } from 'react';
import GenericImage from '@/common/GenericImage';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { StoreModel } from '@/redux/model';
import DotsLoader from './DotsLoader';
import { MessageInterface } from '@/redux/model/conversationModel';
import { useMutation } from '@/hooks/useMutation';
import { POST } from '@/hooks/consts';
import { ApiUrl } from '@/constants/apiUrl';
import { RollbackIcon } from '@/components/SVG';
import { useSearchParams } from 'next/navigation';
import { decrypt } from '@/utils/encryption';
const AiQuestions = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const sharedId = token ? decrypt(token) : null;
  const { loader, code } = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const setPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.setPrompt
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const setConversation = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel.setConversation
  );
  const selectedStrategy = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel.strategy
  );
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
    <div className="Scroller-Class block w-full flex-col items-start gap-4 overflow-y-auto overflow-x-hidden pb-8 md:flex">
      {conversation.messages
        .filter((msg: MessageInterface, index: number) => {
          if (!index) return true;
          if (msg.isQuestion && msg.userPrompt === '') {
            return index <= conversation.unansweredQuestionIndex;
          }
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
                  {msg.textResponse || msg.aiResponse}
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

            {msg.isSuggestion && msg.textResponse && (
              <div className="ml-20 flex flex-col items-end">
                <GenericImage
                  className="z-[3] mb-2 mt-2 w-6 md:mb-1"
                  alt="profile avatar"
                  src="/asstes/images/ad-dashboard.png"
                  classNames={{ img: 'w-9' }}
                />
                <div className="leading-2 max-h-auto mr-8 w-[100%] rounded-2xl rounded-se-none bg-custom-purple p-4 font-Jakarta text-[16px] font-normal text-white">
                  {msg.textResponse}
                </div>
              </div>
            )}

            {!msg.isQuestion &&
              !msg.isSuggestion &&
              !(
                (selectedStrategy.id === 'guided-prompting' ||
                  selectedStrategy.id === 'self-prompting') &&
                !index &&
                !msg.textResponse
              ) && (
                <div className="mr-20 flex flex-col items-start">
                  <GenericImage
                    className="z-[3] mb-2 mt-2 w-6 md:mb-0"
                    alt="AD"
                    src="/asstes/images/ad-dashboard.png"
                    classNames={{ img: 'w-8' }}
                  />
                  {msg.aiResponse.length ? (
                    <div className="leading-2 max-h-auto ml-8 w-full rounded-2xl rounded-ss-none bg-slate-100 p-4 font-Jakarta text-[16px] font-normal text-black">
                      {msg.textResponse || 'Done'}
                    </div>
                  ) : (
                    loader && <DotsLoader />
                  )}
                </div>
              )}

            {conversation.messages &&
              !loader &&
              code &&
              !sharedId &&
              conversation.messages.length &&
              !(code === msg.code) &&
              !msg.isQuestion &&
              !msg.isSuggestion &&
              !(
                (selectedStrategy.id === 'guided-prompting' ||
                  selectedStrategy.id === 'self-prompting') &&
                !index
              ) && (
                <div className="group absolute -bottom-4 right-8 flex size-8 cursor-pointer items-center justify-center rounded bg-custom-gradient p-1.5 transition-colors duration-200 hover:opacity-90">
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
            <div ref={lastMsgRef}></div>
          </div>
        ))}
    </div>
  );
};

export default AiQuestions;
