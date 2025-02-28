'use client';

import React, { useState, useEffect } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import { Addicon } from '@/components/SVG';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { extractAttributes } from '@/utils/utils';
import Loader from '@/Loader/loading';
import { StoreModel } from '@/redux/model';

const TextArea = ({
  prompt,
  classNames,
  // isExpanded,
  ...props
}: any) => {
  const router = useRouter();
  const promptData = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const user = useStoreState<StoreModel>((state) => state?.userObj?.UserObj);
  const setPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.setPrompt
  );
  const { setConversation, addMessage } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );

  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    setInputValue(prompt?.question || '');
  }, [prompt]);

  const { mutate } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.GENERATE_AI_RESPONSE,
    onSuccess: (res) => {
      const { conversationId, messages, title } = res?.data;
      const lastMessage = messages[messages.length - 1];
      const newPrompt = {
        code: lastMessage.code,
        content: lastMessage.userPrompt,
        loader: false,
      };
      const newConversation = {
        _id: conversationId,
        userId: user.id,
        messages,
        title,
      };
      setPrompt(newPrompt);
      setConversation(newConversation);
      router.push(`/overview/${conversationId}`);
    },
  });
  const { mutate: questionMutate } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.GENERATE_AI_QUESTIONS,
    onSuccess: (res) => {
      const { conversationId, messages, title } = res?.data;
      const lastMessage = messages[messages.length - 1];
      const newPrompt = {
        code: lastMessage.code,
        content: lastMessage.userPrompt,
        loader: false,
      };
      const newConversation = {
        _id: conversationId,
        userId: user.id,
        messages,
        title,
      };
      setPrompt(newPrompt);
      setConversation(newConversation);
      router.push(`/overview/${conversationId}`);
    },
  });
  const handleSubmit = () => {
    if (inputValue.length < 1) return;
    const newMessages = {
      userPrompt: inputValue,
      aiResponse: '',
      code: {},
      id: '',
    };
    addMessage(newMessages);
    setPrompt({ question: inputValue, loader: true });
    const attributes = extractAttributes(inputValue);
    const mutationInput = {
      humanPrompt: inputValue,
      attributes,
      conversationId: conversation.conversationId,
      userId: user.id,
    };
    // mutate(mutationInput);
    questionMutate(mutationInput);
    setInputValue('');
  };
  return (
    <div className="relative mt-10 flex w-full items-end justify-between rounded-xl bg-white shadow-lg xl:mb-5">
      <div className="flex w-full items-end">
        <Button
          className={`${
            !prompt?.question ? 'cursor-not-allowed bg-opacity-30' : ''
          } absolute left-1 z-[5] w-auto min-w-fit bg-transparent p-0`}
        >
          <Addicon />
        </Button>

        <Textarea
          placeholder="Type '/' for commands"
          className="max-w-full resize-none text-black shadow-none"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputValue(e.target.value)
          }
          maxRows={6}
          classNames={{
            base: `!p-0 !bg-transparent ${classNames?.base}`,
            innerWrapper: `flex items-center ${classNames?.innerWrapper}`,
            input: `scrollbar-hide  !rounded-none !min-h-[60px] ${classNames?.input}`,
            inputWrapper: `!pl-[30px] !pr-[42px] bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:!bg-transparent shadow-none ${classNames?.inputWrapper}`,
          }}
          {...props}
        />
      </div>

      <Button
        disabled={!inputValue && promptData.loader}
        className={`h-10 w-14 ${
          !inputValue ? 'cursor-not-allowed bg-opacity-30' : ''
        } absolute bottom-1 right-2.5 z-[5] min-w-fit rounded-md bg-custom-gradient px-3 py-2.5 text-white group-hover:bg-custom-white`}
        onClick={handleSubmit}
      >
        <span className="leading-none">
          {promptData.loader ? (
            <Loader Color="#bbb" height="20px" width="20px" />
          ) : (
            'Code'
          )}
        </span>
      </Button>
    </div>
  );
};

export default TextArea;
