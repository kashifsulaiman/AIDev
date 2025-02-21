'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@nextui-org/react';
import { Addicon } from '@/components/SVG';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter, usePathname } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { extractAttributes } from '@/utils/utils';
import Loader from '@/Loader/loading';
import { StoreModel } from '@/redux/model';
import { useDebounce } from '@/hooks/useDebounce';

const TextArea = ({
  prompt,
  // isExpanded,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const promptData = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const user = useStoreState<StoreModel>((state) => state?.userObj?.UserObj);
  const { setPrompt } = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel
  );
  const { setConversation, addMessage } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );

  const [inputValue, setInputValue] = useState(
    pathname.startsWith('/overview') ? promptData.question.trim() : ''
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debouncedInput = useDebounce(inputValue, 1000);

  const handleBlur = () => {
    if (textareaRef.current) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            textareaRef.current.value.length,
            textareaRef.current.value.length
          );
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [pathname]);

  useEffect(() => {
    if (prompt?.question) {
      setInputValue(prompt?.question.trim());
    }
  }, [prompt]);

  useEffect(() => {
    if (debouncedInput && promptData.loader) {
      setPrompt({ question: debouncedInput });
      setInputValue(debouncedInput);
    }
  }, [debouncedInput]);

  const { mutate } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.GENERATE_AI_RESPONSE,
    onSuccess: (res) => {
      const { conversationId, messages, title } = res?.data;
      setPrompt({
        code: messages[messages.length - 1].code,
        content: messages[messages.length - 1].userPrompt,
        loader: false,
      });
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
    if (inputValue.length < 1) return;
    setPrompt({ question: inputValue, loader: true });
    const attributes = extractAttributes(inputValue);
    mutate({
      humanPrompt: inputValue,
      attributes,
      conversationId: conversation.conversationId,
      userId: user.id,
    });
    addMessage({
      userPrompt: inputValue,
      aiResponse: '',
      code: {},
      id: '',
    });
    setInputValue('');
  };

  return (
    <div className="relative mt-10 flex w-full flex-col items-end justify-between rounded-xl bg-white p-2 shadow-lg xl:mb-5 xl:flex-row">
      <div className="flex w-full items-end">
        <Button
          className={`${
            !prompt?.question ? 'cursor-not-allowed bg-opacity-30' : ''
          } absolute left-1 z-[5] w-auto min-w-fit bg-transparent p-0`}
        >
          <Addicon />
        </Button>

        <textarea
          ref={textareaRef}
          onBlur={handleBlur}
          id="custom-textarea"
          placeholder="Type '/' for commands"
          className="!min-h-[90px] w-full resize-none !rounded-none !p-0 !pl-[30px] !pr-[42px] text-black shadow-none scrollbar-hide focus:!border-none focus:!outline-none focus:!ring-0"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.shiftKey &&
              !promptData?.loader &&
              inputValue.length > 0
            ) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </div>

      <Button
        disabled={promptData.loader}
        className={`h-10 w-14 ${
          promptData.loader ? 'cursor-not-allowed bg-opacity-30' : ''
        } min-w-fit rounded-md bg-custom-gradient px-3 py-2.5 text-white group-hover:bg-custom-white`}
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
