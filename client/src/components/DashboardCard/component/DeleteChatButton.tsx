import { useState } from 'react';
import { Button } from '@nextui-org/react';
import DeleteChatModal from './DeleteChatModal';
import { SettingsIcon } from '@/components/SVG';
import { ApiUrl } from '@/constants/apiUrl';
import { useStoreActions } from 'easy-peasy';
import { StoreModel } from '@/redux/model';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function DeleteChatButton({ chatId }: { chatId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { removeMessage } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );

  const deleteChat = async (id: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${ApiUrl.DELETE_CHAT}/${id}`;
    const response = await axios.delete(url);
    return response.data;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteChat(chatId),
    onSuccess: (res) => {
      console.log(res);
      const { _id } = res?.data;
      removeMessage({ _id });
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error deleting chat:', error);
    },
  });

  const onConfirm = () => {
    mutate();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-5 min-w-fit rounded-full bg-transparent"
      >
        <SettingsIcon classes="w-6 h-6 text-gray-600" />
      </Button>
      <DeleteChatModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        isLoading={isLoading}
      />
    </>
  );
}
