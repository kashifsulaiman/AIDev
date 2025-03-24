import { useStoreActions, useStoreState } from 'easy-peasy';
import { useMutation } from '@/hooks/useMutation';
import { extractAttributes } from '@/utils/utils';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { StoreModel } from '@/redux/model';
import { MessageInterface } from '@/redux/model/conversationModel';
import { useGenerateCode } from '@/hooks/useGenerateCode';

export const useQuestionGeneration = (
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

  const { setPrompt } = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel
  );
  const { setConversation } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );

  const { mutate } = useMutation({
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

      setPrompt(newPrompt);
      setConversation({
        conversationId,
        userId: user.id,
        messages,
        title,
        unansweredQuestions,
        unansweredQuestionIndex,
        questionStatus,
      });

      if (questionStatus === 'completed') {
        generateCode();
      }
    },
  });

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

    setPrompt({ content: inputValue, loader: true });
    mutate(mutationInput);
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

  return { handleQuestions, generateQuestion, updateUnansweredQuestion };
};
