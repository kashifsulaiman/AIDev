import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { CopyToClipboardIcon } from '@/components/SVG';
import { showToaster } from '@/components/Toaster';

interface ShareLinkModalInterface {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export default function ShareLinkModal({
  isOpen,
  onClose,
  shareUrl,
}: ShareLinkModalInterface) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    showToaster('Link copied to clipboard!', 'success');
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        <ModalBody className="p-6 text-center">
          <h2 className="mt-4 text-xl font-semibold">Share Chat</h2>
          <p className="mt-2 text-gray-500">
            Copy and share this link to share your chat.
          </p>
          <div className="mt-2 flex items-center justify-between gap-2 rounded-full border px-4 py-2">
            <span className="truncate">{shareUrl}</span>
            <Button
              onClick={copyToClipboard}
              className="h-8 min-w-fit rounded-xl bg-custom-gradient text-white group-hover:bg-custom-white"
            >
              <CopyToClipboardIcon classes="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-3 flex justify-center">
            <Button onClick={onClose} className="bg-gray-200 text-white">
              Close
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
