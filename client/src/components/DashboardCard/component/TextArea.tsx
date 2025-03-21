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
  const { strategy: selectedStrategy } = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel
  );
  const { selfPromptingIteration: {selectedIteration,isGenerating,iterationCount, lastGeneratedIteration} } = useStoreState<StoreModel>(
    (state) => state.selfPromptingModel
  );
  const { setGenerating, setIterationCount, setLastGeneratedIteration  } = useStoreActions<StoreModel>(
    (actions) => actions.selfPromptingModel
  );
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    setInputValue(prompt?.question || '');
  }, [prompt]);

  useEffect(() => {
    if (!isGenerating || iterationCount > selectedIteration) {
      setGenerating(false);
      return;
    }
  
    if (lastGeneratedIteration >= iterationCount) {
      console.log("Iteration completed, moving to next iteration...");
      setIterationCount(iterationCount + 1); // Move to the next iteration
    } else if (lastGeneratedIteration < iterationCount) {
      console.log(`Starting iteration ${iterationCount}...`);
      generateCode(conversation.conversationId);
    }
  }, [isGenerating, iterationCount, lastGeneratedIteration]);

  
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
      if(selectedStrategy.id === 'self-prompting') {
        setLastGeneratedIteration(iterationCount);
      }
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
        userId: user.id,
        messages,
        title,
      };
      setPrompt(newPrompt);
      setConversation(newConversation);
      // console.log(" suggestionMutate conversation: ", conversation)
    },
  });

  const generateCode = async (conversationId?: string) => {
    // console.log(" generateCode conversation: ", conversation)
    const attributes = extractAttributes(inputValue);
    const mutationInput = {
      humanPrompt: inputValue,
      attributes,
      conversationId: conversationId ? conversationId : conversation.conversationId,
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
      userId: user.id,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
      promptingStrategy: selectedStrategy.id,
    };
    setPrompt({ question: inputValue, loader: true });
    await suggestionMutate(mutationInput);
  };

  const executeSelfPromptingFlow = async (iteration = 1, conversationId:string) => {
    console.log(selectedStrategy.id, conversationId)
    if (iteration > selectedIteration) {
      return; // Stop when we reach the max iteration count
    }
  
    let currentConversationId = conversationId; // Keep track of the conversationId
  
    if (!currentConversationId) {
      console.log("No conversationId found. Creating a new conversation...");
  
      const initialMutationInput = {
        humanPrompt: inputValue,
        attributes: extractAttributes(inputValue),
        userId: user.id,
        model: {
          provider: currentModel.provider,
          reasoning: currentModel.reasoning,
          aiModel: currentModel.model,
        },
        promptingStrategy: selectedStrategy.id,
      };
  
      // Perform the first mutation to get a new conversationId
      const response = await suggestionMutate(initialMutationInput);
      console.log("response", response)
      if (response?.data?.conversationId) {
        currentConversationId = response.data.conversationId; // Assign the new conversationId
        setConversation({
          ...conversation,
          conversationId: currentConversationId, // Update global state
          messages: response.data.messages,
          title: response.data.title,
        });
      } else {
        console.error("Failed to create a new conversation. Stopping execution.");
        return;
      }
    }
  
    // Prepare input for the next iteration
    const mutationInput = {
      humanPrompt: inputValue,
      attributes: extractAttributes(inputValue),
      conversationId: currentConversationId, // Use updated conversationId
      userId: user.id,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
      promptingStrategy: selectedStrategy.id,
    };
  
    setPrompt({ question: inputValue, loader: true });
  
    await suggestionMutate(mutationInput); // Generate AI suggestion
  
    await generateCode(currentConversationId);
  
    // Proceed to the next iteration with the updated conversationId
    setTimeout(() => executeSelfPromptingFlow(iteration + 1, currentConversationId), 1000);
  };

  const handleSelfPrompting = async () => {
    setGenerating(true);
    setIterationCount(1);
    setConversation(conversation.conversationId);
    setLastGeneratedIteration(0); 
  }
  
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
      // executeSelfPromptingFlow(1, conversation.conversationId)
      handleSelfPrompting();
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
