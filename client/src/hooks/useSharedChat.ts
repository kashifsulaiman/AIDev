import { useMutation } from '@/hooks/useMutation';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { ApiUrl } from '@/constants/apiUrl';
import { POST } from '@/hooks/consts';
import { StoreModel } from '@/redux/model';
import { useGenerateCode } from '@/hooks/useGenerateCode';

export const useSharedChat = (
  inputValue: string,
  setInputValue: (value: string) => void
) => {
  const { generateCode } = useGenerateCode(inputValue, setInputValue);
  const user = useStoreState<StoreModel>((state) => state?.userObj?.UserObj);
  const { setPrompt } = useStoreActions<StoreModel>(
    (actions) => actions.promptModel
  );

  const { mutate } = useMutation({
    isToaster: true,
    method: POST,
    url: ApiUrl.SHARE_CHAT,
    onSuccess: async (res) => {
      const { conversationId } = res?.data;
      await generateCode(conversationId);
    },
    onError: () => {
      console.error('Failed to copy conversation.');
    },
  });

  const shareChat = async (conversationId: string) => {
    if (!conversationId || !user?.id) return;
    setPrompt({ content: inputValue, loader: true });
    mutate({ conversationId, userId: user._id });
  };

  return { shareChat };
};
