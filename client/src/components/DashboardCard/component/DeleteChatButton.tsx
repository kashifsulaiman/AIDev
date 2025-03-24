import { Button } from '@nextui-org/react';
import DeleteChatModal from './DeleteChatModal';
import { SettingsIcon } from '@/components/SVG';
import { useState } from 'react';

export function DeleteChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const onConfirm = () => {};

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
      />
    </>
  );
}
