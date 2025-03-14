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
import { MessageInterface } from '@/redux/model/conversationModel';

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
  const selectedStrategy = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel.strategy
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
        (msg: MessageInterface) => msg.isQuestion && !msg.userPrompt
      );
      const unansweredQuestionIndex = messages.findIndex(
        (msg: MessageInterface) => msg.isQuestion && !msg.userPrompt
      );
      const newConversation = {
        conversationId,
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
      promptingStrategy: selectedStrategy.id,
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

  const updateUnansweredQuestion = () => {
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
    if (allAnswered) generateQuestion();
  };

  const handleQuestions = () => {
    if (!conversation.conversationId) {
      if (pathname.endsWith('main')) {
        const current = new URLSearchParams(searchParams.toString());
        current.delete('promptType');
        router.push(`${pathname}${current.toString() ? `?${current}` : ''}`);
      }
      return generateQuestion();
    }

    if (conversation.questionStatus === 'pending') {
      return updateUnansweredQuestion();
    }

    if (['completed', 'saved'].includes(conversation.questionStatus)) {
      return generateCode();
    }
  };

  const handleSubmit = () => {
    if (!inputValue.length) return;
    if (selectedStrategy.id === 'prompt-refinement') {
      generateCode();
    } else if (selectedStrategy.id === 'guided-prompting') {
      handleQuestions();
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
