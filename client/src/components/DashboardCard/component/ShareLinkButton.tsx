import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { FileShareIcon } from '@/components/SVG';
import ShareLinkModal from './ShareLinkModal';
import { useShareUrl } from '@/hooks/useShareUrl';

interface ShareLinkButtonProps {
  chatId: string;
  buttonClassName?: string;
  iconClassName?: string;
}

export function ShareLinkButton({
  chatId,
  buttonClassName = '',
  iconClassName = '',
}: ShareLinkButtonProps) {
  const shareUrl = useShareUrl(chatId);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={buttonClassName}>
        <FileShareIcon classes={iconClassName} />
      </Button>
      <ShareLinkModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        shareUrl={shareUrl}
      />
    </>
  );
}
