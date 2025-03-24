'use client';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { useMutation } from '@/hooks/useMutation';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { StoreModel } from '@/redux/model';
import { extractAttributes } from '@/utils/utils';
import { useGenerateCode } from '@/hooks/useGenerateCode';

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
        userId: user.id,
        messages,
        title,
      });

      await generateCode(conversationId);
    },
  });

  const generateSelfPromptingSuggestion = async () => {
    const attributes = extractAttributes(inputValue);
    const mutationInput = {
      humanPrompt: inputValue,
      attributes,
      conversationId: conversation?.conversationId,
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

  const handleSelfPromptingFlow = (conversationId?: string) => {
    if (conversationId) {
      generateCode(conversationId);
    } else {
      setGenerating(true);
      setIterationCount(1);
    }
  };

  return {
    handleSelfPromptingFlow,
    generateSelfPromptingSuggestion,
  };
};
