import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { FileShareIcon } from '@/components/SVG';
import ShareLinkModal from './ShareLinkModal';
import { useShareUrl } from '@/hooks/useShareUrl';

export function ShareLinkButton({ chatId }: { chatId: string }) {
  const shareUrl = useShareUrl(chatId);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="h-5 min-w-fit rounded-none bg-transparent !pl-0 !pr-2 text-inherit"
      >
        <FileShareIcon classes="w-4 h-4 text-inherit hover:!text-gray-400" />
      </Button>
      <ShareLinkModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        shareUrl={shareUrl}
      />
    </>
  );
}
