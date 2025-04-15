import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useState } from 'react';
import UploadImportModalHandler from './UploadImportModal/UploadImportModalContentHandler';
import { BackArrowIcon } from '@/components/SVG';
import { UploadImportModalInterface } from '@/types/interface';

export default function UploadImportProjectModal({
  isOpen,
  handleCloseModal,
}: UploadImportModalInterface) {
  const closeModal = () => {
    setCurrentTab('intro');
    handleCloseModal();
  };

  const [currentTab, setCurrentTab] = useState<
    'intro' | 'github' | 'local-import' | 'github-import' | 'github-export'
  >('intro');

  const handleNavigateToPreviousTab = () => {
    switch (currentTab) {
      case 'github':
        setCurrentTab('intro');
        break;
      case 'local-import':
        setCurrentTab('intro');
        break;
      case 'github-export':
        setCurrentTab('github');
        break;
      case 'github-import':
        setCurrentTab('github');
        break;
      default:
        setCurrentTab('intro');
        break;
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="import-local-project"
      className="max-h-[550px]"
      isOpen={isOpen}
      onOpenChange={closeModal}
    >
      <ModalContent>
        <ModalBody className="flex w-full flex-col items-center gap-2 p-6 text-center">
          {currentTab !== 'intro' && (
            <span onClick={handleNavigateToPreviousTab}>
              <BackArrowIcon classes="absolute left-3.5 top-3.5 text-gray-600 size-5 cursor-pointer" />
            </span>
          )}

          <UploadImportModalHandler
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            handleCloseModal={closeModal}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
