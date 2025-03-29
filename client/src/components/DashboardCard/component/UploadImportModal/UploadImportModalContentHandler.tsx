import { SelectedRepoType } from '@/types/modalTypes';
import GithubImportModalContent from './Github/ImportModalContent';
import ImportLocalIntroContent from './ImportLocal/ImportLocalntroContent';
import GithubIntroModalContent from './Github/IntroModalContent';
import IntroModalContent from './IntroModalContent';
import GithubExportModalContent from './Github/ExportModalContent';
import { useState } from 'react';
import { UploadImportModalHandlerInterface } from '@/types/interface';

export default function UploadImportModalHandler({
  currentTab,
  setCurrentTab,
  handleCloseModal,
}: UploadImportModalHandlerInterface) {
  const [repos, setRepos] = useState<SelectedRepoType[] | null>(null);

  switch (currentTab) {
    case 'intro':
      return <IntroModalContent setCurrentTab={setCurrentTab} />;
    case 'local-import':
      return <ImportLocalIntroContent handleCloseModal={handleCloseModal} />;
    case 'github':
      return (
        <GithubIntroModalContent
          setRepos={setRepos}
          handleCloseModal={handleCloseModal}
          setCurrentTab={setCurrentTab}
        />
      );
    case 'github-export':
      return <GithubExportModalContent modalCloseHandler={handleCloseModal} />;
    case 'github-import':
      return (
        <GithubImportModalContent
          repos={repos}
          modalCloseHandler={handleCloseModal}
        />
      );
    default:
      return null;
  }
}
