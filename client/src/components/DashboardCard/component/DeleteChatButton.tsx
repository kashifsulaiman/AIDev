import { useState } from 'react';
import { Button } from '@nextui-org/react';
import DeleteChatModal from './DeleteChatModal';
import { ApiUrl } from '@/constants/apiUrl';
import { useStoreActions } from 'easy-peasy';
import { StoreModel } from '@/redux/model';
import { TrashIcon } from '@/components/SVG';
import { usePathname, useRouter } from 'next/navigation';
import { DELETE } from '@/hooks/consts';
import { useMutation } from '@/hooks/useMutation';

export function DeleteChatButton({ chatId }: { chatId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { removeMessage, clearConversation } = useStoreActions<StoreModel>(
    (actions) => actions.conversationModel
  );

  const { mutate, isLoading } = useMutation({
    url: ApiUrl.DELETE_CHAT,
    method: DELETE,
    onSuccess: (res) => {
      const { success } = res?.data;
      if (!success) {
        return;
      }
      removeMessage({ _id: chatId });
      setIsOpen(false);
      if (pathname.startsWith('/overview')) {
        router.push('/main');
        clearConversation();
      }
    },
    onError: (error) => {
      console.error('Error deleting chat:', error);
    },
    showSuccessToast: true,
  });

  const onConfirm = () => {
    mutate(chatId);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-5 min-w-fit rounded-none bg-transparent !pl-0 !pr-2 text-inherit"
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
