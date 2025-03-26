import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { StoreModel } from '@/redux/model';
import { useStoreState } from 'easy-peasy';
import { GithubAuthModalInterface } from '@/types/interface';
import { useState } from 'react';
import ImportModalContent from './GithubModal/ImportModalContent';
import { BackArrowIcon, GithubIcon } from '@/components/SVG';
import { SelectedRepoType } from '@/types/modalTypes';
import IntroModalContent from './GithubModal/IntroModalContent';
import ExportModalContent from './GithubModal/ExportModalContent';

export default function GithubAuthModal({
  isModalOpen,
  modalCloseHandler,
}: GithubAuthModalInterface) {
  const githubAuth = useStoreState<StoreModel>(
    (state) => state?.githubAuthModel.githubModel
  );

  const [currentTab, setCurrentTab] = useState<'intro' | 'import' | 'export'>(
    'intro'
  );
  const [selectedRepo, setSelectedRepo] = useState<SelectedRepoType>({
    label: 'Select repository to import',
  });
  const [repos, setRepos] = useState<SelectedRepoType[] | null>(null);

  return (
    <Modal
      className="max-h-[550px]"
      closeButton
      size="lg"
      aria-labelledby="modal-title"
      isOpen={isModalOpen}
      onClose={modalCloseHandler}
    >
      <ModalContent>
        <ModalBody className="relative mx-auto flex w-full flex-col items-center pb-14 pt-8">
          {currentTab !== 'intro' && (
            <span onClick={() => setCurrentTab('intro')}>
              <BackArrowIcon classes="absolute left-3.5 top-3.5 text-gray-600 size-5 cursor-pointer" />
            </span>
          )}

          <p className="flex items-center gap-2 whitespace-normal py-2">
            <GithubIcon classes="size-8 text-white bg-black rounded-full p-1.5" />
            <span className="text-lg font-semibold">{githubAuth.username}</span>
          </p>

          {currentTab === 'intro' && (
            <IntroModalContent
              modalCloseHandler={modalCloseHandler}
              setRepos={setRepos}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'import' && (
            <ImportModalContent
              repos={repos}
              modalCloseHandler={modalCloseHandler}
              selectedRepo={selectedRepo}
              setSelectedRepo={setSelectedRepo}
            />
          )}

          {currentTab === 'export' && (
            <ExportModalContent modalCloseHandler={modalCloseHandler} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
