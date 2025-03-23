'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import { Addicon } from '@/components/SVG';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';
import { extractAttributes } from '@/utils/utils';
import Loader from '@/Loader/loading';
import { StoreModel } from '@/redux/model';
import { MessageInterface } from '@/redux/model/conversationModel';
import { useGenerateCode } from '@/hooks/useGenerateCode';
import { useQuestionGeneration } from '@/hooks/useQuestionGeneration';
import { useSelfPrompting } from '@/hooks/useSelfPrompting';

const TextArea = ({
  prompt,
  classNames,
  // isExpanded,
  ...props
}: any) => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { generateCode } = useGenerateCode(inputValue, setInputValue)
  const { handleQuestions } = useQuestionGeneration(inputValue, setInputValue);
  const { generateSelfPromptingSuggestion } = useSelfPrompting(inputValue, setInputValue);
  const promptData = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const setPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.setPrompt
  );
  const { strategy: selectedStrategy } = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel
  );

  const hasRun = useRef(false);

  useEffect(() => {
    setInputValue(prompt?.question || '');
  }, [prompt]);

  const handleSubmit = async() => {
    if (!inputValue.length) return;

    if (pathname.endsWith('main')) {
      const current = new URLSearchParams(searchParams.toString());
      current.delete('promptType');
      router.push(`${pathname}${current.toString() ? `?${current}` : ''}`);
    }

    if (selectedStrategy.id === 'prompt-refinement') {
      generateCode();
    } else if (selectedStrategy.id === 'guided-prompting') {
      handleQuestions();
    } else if (selectedStrategy.id === 'self-prompting') {
      generateSelfPromptingSuggestion();
    }
  };

  return (
    <div className="relative mt-2 flex w-full items-end justify-between rounded-xl bg-white shadow-lg xl:mb-5">
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
            input: `scrollbar-hide  !rounded-none !max-h-[60px] ${classNames?.input}`,
            inputWrapper: `!pl-[30px] !pr-[42px] bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:!bg-transparent shadow-none ${classNames?.inputWrapper}`,
          }}
          {...props}
        />
      </div>

      <div className="absolute bottom-1 right-2.5 z-[5] flex min-w-fit flex-col items-start">
        <Button
          disabled={!inputValue && promptData.loader}
          className={`h-10 w-14 ${
            !inputValue ? 'cursor-not-allowed bg-opacity-30' : ''
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
    </div>
  );
};

export default TextArea;
