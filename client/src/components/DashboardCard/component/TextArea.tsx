'use client';

import React, { useState, useEffect } from 'react';
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

const TextArea = ({
  prompt,
  classNames,
  // isExpanded,
  ...props
}: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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

  const currentModel = useStoreState<StoreModel>(
    (state) => state.aiModel.model
  );

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
      const { conversationId, messages, title, questionStatus } = res?.data;
      const lastMessage = messages[messages.length - 1];
      const newPrompt = {
        code: lastMessage.code,
        content: lastMessage.userPrompt,
        loader: false,
      };
      const unansweredQuestions = messages.filter(
        (msg: any) => msg.isQuestion && !msg.userPrompt
      );
      const unansweredQuestionIndex = messages.findIndex(
        (msg: any) => msg.isQuestion && !msg.userPrompt
      );
      const newConversation = {
        conversationId: conversationId,
        userId: user.id,
        messages,
        title,
        unansweredQuestions,
        unansweredQuestionIndex,
        questionStatus,
      };
      setPrompt(newPrompt);
      setConversation(newConversation);
      if (questionStatus === 'completed') {
        generateCode();
      }
    },
  });

  const generateCode = async () => {
    const attributes = extractAttributes(inputValue);
    const mutationInput = {
      humanPrompt: inputValue,
      attributes,
      conversationId: conversation.conversationId,
      userId: user.id,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
    };
    if (conversation.unansweredQuestionIndex === -1) {
      const newMessages = {
        userPrompt: inputValue,
        aiResponse: '',
        code: null,
        id: '',
        textResponse: '',
        isQuestion: false,
      };
      addMessage(newMessages);
    }
    setPrompt({ question: inputValue, loader: true });
    mutate(mutationInput);
    setInputValue('');
  };

  const generateQuestion = async () => {
    const attributes = extractAttributes(inputValue);
    const mutationInput = {
      humanPrompt: inputValue,
      attributes,
      conversationId: conversation?.conversationId,
      conversationMessages: conversation?.messages,
      userId: user.id,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
    };
    setPrompt({ question: inputValue, loader: true });
    questionMutate(mutationInput);
    setInputValue('');
  };

  const handleSubmit = () => {
    if (inputValue.length < 1) return;
    if (conversation.conversationId) {
      if (conversation.questionStatus === 'pending') {
        const updatedMessages = [...conversation.messages];
        updatedMessages[conversation.unansweredQuestionIndex].userPrompt =
          inputValue;
        const nextUnansweredIndex = conversation.unansweredQuestionIndex + 1;
        const allAnswered =
          nextUnansweredIndex > conversation.unansweredQuestions.length;
        setConversation({
          ...conversation,
          messages: updatedMessages,
          unansweredQuestionIndex: allAnswered ? -1 : nextUnansweredIndex,
        });
        setInputValue('');
        if (allAnswered) {
          generateQuestion();
        }
      } else if (
        conversation.questionStatus === 'completed' ||
        conversation.questionStatus === 'saved'
      ) {
        generateCode();
      }
    } else {
      if (pathname.endsWith('main')) {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.delete('promptType');
        const search = current.toString();
        const query = search ? `?${search}` : '';
        router.push(`${pathname}${query}`);
      }
      generateQuestion();
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
