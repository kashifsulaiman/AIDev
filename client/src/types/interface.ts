import { Project } from '@stackblitz/sdk';
import { Dispatch, SetStateAction } from 'react';
import { RepoItemsType, SelectedRepoType } from './modalTypes';

export interface PreviewMainInterface {
  handleViewChange: () => void;
  code: Project;
}

export interface OverviewMainInterface {
  handleViewChange: () => void;
  view: boolean;
}

export interface OverviewRightInterface {
  handleViewChange: () => void;
  view: boolean;
}

export interface OverviewLeftInterface {
  view: boolean;
}

export interface IconInterface {
  classes?: string;
}

export interface DropdownInterface<T> {
  items: T[];
  selectedItem: T;
  onSelect: (item: T) => void;
}

export interface GithubIntroModalContentInterface {
  handleCloseModal: () => void;
  setRepos: Dispatch<SetStateAction<SelectedRepoType[] | null>>;
  setCurrentTab: Dispatch<
    SetStateAction<
      'intro' | 'github' | 'local-import' | 'github-import' | 'github-export'
    >
  >;
}

export interface GithubImportModalContentInterface {
  modalCloseHandler: () => void;
  repos: SelectedRepoType[] | null;
}

export interface GithubExportModalContentInterface {
  modalCloseHandler: () => void;
}

export type UploadImportModalHandlerInterface = {
  currentTab:
    | 'intro'
    | 'github'
    | 'local-import'
    | 'github-import'
    | 'github-export';
  setCurrentTab: Dispatch<
    SetStateAction<
      'intro' | 'github' | 'local-import' | 'github-import' | 'github-export'
    >
  >;
  handleCloseModal: () => void;
};

export type IntroModalContentInterface = {
  setCurrentTab: Dispatch<
    SetStateAction<
      'intro' | 'github' | 'local-import' | 'github-import' | 'github-export'
    >
  >;
};
export type ImportLocalIntroContentInterface = {
  handleCloseModal: () => void;
};

export interface UploadImportModalInterface {
  isOpen: boolean;
  handleCloseModal: () => void;
}

export interface BreadcrumbSectionInterface {
  setSelectedItems: Dispatch<SetStateAction<RepoItemsType[] | null>>;
  localSelected: RepoItemsType[];
  selectedRepo: SelectedRepoType;
  capacity: number;
  currentPath: string;
  setCurrentPath: Dispatch<SetStateAction<string>>;
}

export interface SelectAllSectionInterface {
  filteredItems: RepoItemsType[];
  getFolderSelectionState: (
    folderName: string
  ) => 'checked' | 'partial' | 'none';
  localSelected: RepoItemsType[];
  setLocalSelected: Dispatch<SetStateAction<RepoItemsType[]>>;
  currentPath: string;
  repoItems: RepoItemsType[] | null;
}

export interface CapacitySectionInterface {
  capacity: number;
}

export interface FileAndFolderViewSectionInterface {
  filteredItems: RepoItemsType[];
  getFolderSelectionState: (
    folderName: string
  ) => 'none' | 'checked' | 'partial';
  localSelected: RepoItemsType[];
  handleSelectItem: (item: RepoItemsType) => void;
  handleSelectFolder: (folderName: string) => void;
  handleFolderClick: (folderName: string) => void;
}
