'use client';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { useMutation } from '@/hooks/useMutation';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { StoreModel } from '@/redux/model';
import { extractAttributes } from '@/utils/utils';
import { useGenerateCode } from '@/hooks/useGenerateCode';
import { useEffect } from 'react';

export const useSelfPrompting = (
  inputValue: string,
  setInputValue: (value: string) => void
) => {
  const { generateCode } = useGenerateCode(inputValue, setInputValue);
  const user = useStoreState<StoreModel>((state) => state?.userObj?.UserObj);
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );
  const currentModel = useStoreState<StoreModel>(
    (state) => state.aiModel.model
  );
  const { strategy: selectedStrategy } = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel
  );

  const { setPrompt } = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel
  );
  const { setConversation } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );
  const { setGenerating, setIterationCount, setApiCalled } =
    useStoreActions<StoreModel>((actions) => actions.selfPromptingModel);
  const { selectedIteration, isGenerating, iterationCount, apiCalled } =
    useStoreState<StoreModel>(
      (state) => state.selfPromptingModel.selfPromptingIteration
    );
  const { mutateAsync } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.GENERATE_AI_SUGGESTIONS,
    onSuccess: async (res) => {
      const { conversationId, messages, title } = res?.data;
      const lastMessage = messages[messages.length - 1];

      setPrompt({
        code: lastMessage.code,
        content: lastMessage.userPrompt,
        loader: false,
      });

      setConversation({
        conversationId,
        userId: user._id,
        messages,
        title,
      });

      await generateCode(conversationId);
    },
  });

  const runSelfPromptingIterations = async () => {
    if (!isGenerating) return;
    if (iterationCount > selectedIteration) {
      setGenerating(false);
      setIterationCount(0);
      return;
    }

    try {
      if (!apiCalled) {
        await generateSelfPromptingSuggestion();
      }
    } catch (error) {
      console.error('Error during iteration:', error);
      setGenerating(false);
    }
  };

  useEffect(() => {
    runSelfPromptingIterations();
  }, [isGenerating, iterationCount]);

  const generateSelfPromptingSuggestion = async () => {
    const attributes = extractAttributes(inputValue);
    const mutationInput = {
      humanPrompt: inputValue,
      attributes,
      conversationId: conversation?.conversationId,
      userId: user._id,
      model: {
        provider: currentModel.provider,
        reasoning: currentModel.reasoning,
        aiModel: currentModel.model,
      },
      promptingStrategy: selectedStrategy.id,
    };

    setPrompt({ content: inputValue, loader: true });
    setInputValue('');
    try {
      setApiCalled(true);
      await mutateAsync(mutationInput);
    } catch (error) {
      console.error('Error generating suggestion:', error);
      setGenerating(false);
    }
  };

  const handleSelfPromptingFlow = async (conversationId?: string) => {
    if (conversationId) {
      // CASE 1: Resuming with existing conversation
      await generateCode(conversationId);
      setGenerating(true);
      setIterationCount(1);
    } else {
      // CASE 2: First-time self-prompting
      await generateCode(); // 👈 First generate code from original prompt
      setGenerating(true); // 👈 THEN start iterations
      setIterationCount(1);
    }
  };

  return {
    handleSelfPromptingFlow,
    generateSelfPromptingSuggestion,
  };
};
