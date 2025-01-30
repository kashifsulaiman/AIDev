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

const TextArea = ({
  prompt,
  classNames,
  // isExpanded,
  ...props
}: any) => {
  const router = useRouter();
  const promptData = useStoreState((state: any) => state?.promptModel?.prompt);
  const conversation = useStoreState(
    (state: any) => state?.conversationModel?.conversation
  );
  const user = useStoreState((state: any) => state?.userObj?.UserObj);
  const setPrompt = useStoreActions(
    (actions: any) => actions?.promptModel?.setPrompt
  );
  const setConversation = useStoreActions(
    (actions: any) => actions.conversationModel.setConversation
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
      const { conversationId, project, text, messages, title } = res?.data;
      setPrompt({ code: project, content: text, loader: false });
      setConversation({
        _id: conversationId,
        userId: user.id,
        messages: messages,
        title: title,
      });
      router.push(`/overview/${conversationId}`);
    },
  });

  const handleSubmit = () => {
    setPrompt({ question: inputValue });
    if (inputValue) {
      setPrompt({ loader: true });
      const attributes = extractAttributes(inputValue);
      mutate({
        humanPrompt: inputValue,
        attributes,
        conversationId: conversation.conversationId,
        userId: user.id,
      });
      setInputValue('');
    }
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
