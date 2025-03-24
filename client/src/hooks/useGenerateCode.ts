import { useMutation } from "@/hooks/useMutation";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ApiUrl } from "@/constants/apiUrl";
import { POST } from "@/hooks/consts";
import { extractAttributes } from "@/utils/utils";
import { StoreModel } from '@/redux/model';
import { useRouter } from 'next/navigation';

export const useGenerateCode = (inputValue: string, setInputValue: (val: string) => void) => {
  const router = useRouter();

  const user = useStoreState<StoreModel>((state) => state.userObj.UserObj);
  const conversation = useStoreState<StoreModel>((state) => state.conversationModel.conversation);
  const currentModel = useStoreState<StoreModel>((state) => state.aiModel.model);
  const { strategy: selectedStrategy } = useStoreState<StoreModel>((state) => state.promptingStrategyModel);
  const { iterationCount } = useStoreState<StoreModel>((state) => state.selfPromptingModel.selfPromptingIteration);

  const { setPrompt } = useStoreActions<StoreModel>((actions) => actions.promptModel);
  const { setConversation, addMessage } = useStoreActions<StoreModel>((actions) => actions.conversationModel);
  const { setApiCalled, setIterationCount } = useStoreActions<StoreModel>((actions) => actions.selfPromptingModel);

  const { mutateAsync } = useMutation({
    isToaster: false,
    method: POST,
    url: ApiUrl.GENERATE_AI_RESPONSE,
    onSuccess: (res) => {
      const { conversationId, messages, title } = res?.data;
      const lastMessage = messages[messages.length - 1];
      setPrompt({ code: lastMessage.code, content: lastMessage.userPrompt, loader: false });
      setConversation({ conversationId, userId: user.id, messages, title });
      if (selectedStrategy.id === 'self-prompting') {
        setApiCalled(false);
        setIterationCount(iterationCount + 1);
      }
      router.push(`/overview/${conversationId}`);
    }
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
    const newMessage = {
      userPrompt: inputValue,
      aiResponse: '',
      code: null,
      id: '',
      textResponse: '',
      isQuestion: false,
    };
    addMessage(newMessage);
    setPrompt({ content: inputValue, loader: true });
    await mutateAsync(mutationInput);
    setInputValue("");
  };

  return { generateCode };
};
