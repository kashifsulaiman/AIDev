import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { StoreModel } from '@/redux/model';
import { useStoreState } from 'easy-peasy';
import { GithubAuthModalInterface } from '@/types/interface';
import { useState } from 'react';
import ImportModalContent from './GithubModal/ImportModalContent';
import { BackArrowIcon, GithubIcon } from '@/components/SVG';
import { SelectedRepoType } from '@/types/modalTypes';
import IntroModalContent from './GithubModal/IntroModalContent';

export default function GithubAuthModal({ isModalOpen, modalCloseHandler }: GithubAuthModalInterface) {

    const githubAuth = useStoreState<StoreModel>(
        (state) => state?.githubAuthModel.githubModel
    );

    const [currentTab, setCurrentTab] = useState<'intro' | 'import' | 'export'>('intro')
    const [repos, setRepos] = useState<SelectedRepoType[] | null>(null)

    return (
        <Modal
            className='max-h-[550px]'
            closeButton
            size='lg'
            aria-labelledby="modal-title"
            isOpen={isModalOpen}
            onClose={modalCloseHandler}
        >
            <ModalContent>
                <ModalBody className='pt-8 pb-14 flex flex-col items-center w-full mx-auto relative'>

                    {currentTab !== 'intro'
                        && <span onClick={() => setCurrentTab('intro')} >
                            <BackArrowIcon classes='absolute left-3.5 top-3.5 text-gray-600 size-5 cursor-pointer' />
                        </span>}

                    <p className='flex items-center gap-2 py-2 whitespace-normal'>
                        <GithubIcon classes='size-8 text-white bg-black rounded-full p-1.5' />
                        <span className="font-semibold text-lg">{githubAuth.username}</span>
                    </p>

                    {currentTab === 'intro' && <IntroModalContent modalCloseHandler={modalCloseHandler} setRepos={setRepos} setCurrentTab={setCurrentTab} />}

                    {currentTab === 'import' && <ImportModalContent repos={repos} modalCloseHandler={modalCloseHandler} />}

                </ModalBody>
            </ModalContent>

        </Modal>
    );
};
