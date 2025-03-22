import { Project } from '@stackblitz/sdk';
import { Dispatch, SetStateAction } from 'react';
import { SelectedRepoType } from './modalTypes';

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

export interface GithubAuthModalInterface {
  isModalOpen: boolean,
  modalCloseHandler: () => void
}

export interface IntroModalContentInterface {
  modalCloseHandler: () => void;
  setRepos: Dispatch<SetStateAction<SelectedRepoType[] | null>>;
  setCurrentTab: Dispatch<SetStateAction<"intro" | "import" | "export">>;
}

export interface ImportModalContentInterface {
  repos: SelectedRepoType[] | null;
  modalCloseHandler: () => void
}

