import { useState } from 'react';
import { Button } from '@nextui-org/react';
import DeleteChatModal from './DeleteChatModal';
import { ApiUrl } from '@/constants/apiUrl';
import { useStoreActions } from 'easy-peasy';
import { StoreModel } from '@/redux/model';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { TrashIcon } from '@/components/SVG';
import { usePathname, useRouter } from 'next/navigation';
import { showToaster } from '@/components/Toaster';

export function DeleteChatButton({ chatId }: { chatId: string }) {
  const router = useRouter();
  const pathname = usePathname();
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
      const {
        data: { _id },
        message,
      } = res;
      showToaster(message, 'success');
      removeMessage({ _id });
      setIsOpen(false);
      if (pathname.startsWith('/overview')) {
        router.push('/main');
      }
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
        className="h-5 min-w-fit rounded-none bg-transparent pl-0 text-inherit"
      >
        <TrashIcon classes="w-4 h-4 text-inherit hover:!text-gray-400" />
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
