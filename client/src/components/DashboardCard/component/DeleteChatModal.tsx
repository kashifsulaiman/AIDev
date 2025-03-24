import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { TrashIcon } from '@/components/SVG';

interface DeleteChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteChatModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteChatModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        <ModalBody className="p-6 text-center">
          <TrashIcon classes="w-12 h-12 mx-auto text-red-500" />
          <h2 className="mt-4 text-xl font-semibold">Delete Chat History?</h2>
          <p className="mt-2 text-gray-500">
            This action cannot be undone. Are you sure you want to delete this
            conversation?
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={onClose} className="bg-gray-200 text-white">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
