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
  const { strategy: selectedStrategy } = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel
  );
  const { selfPromptingIteration: { selectedIteration, isGenerating, iterationCount, lastGeneratedIteration, isOldApiCalled } } = useStoreState<StoreModel>(
    (state) => state.selfPromptingModel
  );
  const { setGenerating, setIterationCount, setLastGeneratedIteration, setIsOldApiCalled } = useStoreActions<StoreModel>(
    (actions) => actions.selfPromptingModel
  );

  const hasRun = useRef(false);

  useEffect(() => {
    setInputValue(prompt?.question || '');
  }, [prompt]);

  // useEffect(() => {
  //   console.log("isGenerating: ", isGenerating);
  //   if (!isGenerating || hasRun.current) return; // Stop if not generating
  
  //   if (iterationCount > selectedIteration) {
  //     setGenerating(false);
  //     return;
  //   }
  
  //   if (lastGeneratedIteration < iterationCount) {
  //     console.log(`Starting iteration ${iterationCount}: Generating suggestion...`);

  //     generateSelfPromptingSuggestion()
  //       .then(() => {
  //         setLastGeneratedIteration(iterationCount);
  //         if (conversation.conversationId) {
  //           generateCode(conversation.conversationId);
  //         }
  //         // ✅ Move to the next iteration
  //         setIterationCount((prev: number) => {
  //           console.log(`Iteration ${prev} completed.`);
  //           return prev + 1;
  //         });
  //       });
  //   }
  // }, [isGenerating, iterationCount, conversation.conversationId]);

  const runIteration = async () => {
    console.log("isGenerating: ", isGenerating);
    if (!isGenerating) return; // Stop if not generating
    if (iterationCount > selectedIteration) {
      setGenerating(false);
      return;
    }
    console.log(`Starting iteration ${iterationCount}: Generating suggestion...`);
    console.log(`last iteration ${lastGeneratedIteration}:`);
    if (lastGeneratedIteration < iterationCount) {
      try {
        await generateSelfPromptingSuggestion();
        setLastGeneratedIteration(iterationCount);
        if (conversation.conversationId) {
          await generateCode(conversation.conversationId);
        }
        // ✅ Move to the next iteration only after completion
        setIterationCount(iterationCount + 1);
      } catch (error) {
        console.error("Error during iteration:", error);
        setGenerating(false); // Stop on error
      }
    }
  };

  useEffect(() => {
    if (isOldApiCalled) {
      return
    }
    runIteration();
  }, [isGenerating, iterationCount, conversation.conversationId]);
  
  
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
        conversationId,
        messages,
        title,
      };
      setPrompt(newPrompt);
      setConversation(newConversation);
      if(selectedStrategy.id === 'self-prompting') {
        setIsOldApiCalled(true);
        setLastGeneratedIteration(iterationCount);
      }
      router.push(`/overview/${conversationId}`);
    },
    onError: (err) => {
      if(selectedStrategy.id === 'self-prompting') {
        console.error("Failed to generate code:", err);
        setGenerating(false); // Stop the process if an error occurs
      }
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

  const { mutateAsync: suggestionMutate } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.GENERATE_AI_SUGGESTIONS,
    onSuccess: (res) => {
      const { conversationId, messages, title } = res?.data;
      const lastMessage = messages[messages.length - 1];
      const newPrompt = {
        code: lastMessage.code,
        content: lastMessage.userPrompt,
        loader: false,
      };
      const newConversation = {
        conversationId: conversationId,
        messages,
        title,
      };
      setPrompt(newPrompt);
      setConversation(newConversation);
      console.log(" suggestionMutate conversation: ", conversation)
    },
  });

  const generateCode = async (conversationId?: string) => {
    const attributes = extractAttributes(inputValue);
    const mutationInput = {
      humanPrompt: inputValue,
      attributes,
      conversationId: conversationId || conversation.conversationId,
      userId: user.id,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
      promptingStrategy: selectedStrategy.id,
    };
    const newMessages = {
      userPrompt: inputValue,
      aiResponse: '',
      code: null,
      id: '',
      textResponse: '',
      isQuestion: false,
    };
    addMessage(newMessages);
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
      return generateQuestion();
    }

    if (conversation.questionStatus === 'pending') {
      return updateUnansweredQuestion();
    }

    if (['completed', 'saved'].includes(conversation.questionStatus)) {
      return generateCode();
    }
  };

  const generateSelfPromptingSuggestion = async () => {
    const attributes = extractAttributes(inputValue);
    const mutationInput = {
      humanPrompt: inputValue,
      attributes,
      conversationId: conversation.conversationId,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
      promptingStrategy: selectedStrategy.id,
    };
    setPrompt({ question: inputValue, loader: true });
    try {
      await suggestionMutate(mutationInput);
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setGenerating(false); // Stop if error
    }
  };

  const handleSelfPromptingFlow = async () => {
    setGenerating(true);
    setIterationCount(1);
    setLastGeneratedIteration(0);
  };
  
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
      handleSelfPromptingFlow();
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
