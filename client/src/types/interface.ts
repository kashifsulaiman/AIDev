import { Project } from '@stackblitz/sdk';

export interface PreviewMainInterface {
  handleViewChange: () => void;
  code: Project;
}

export interface OverviewMainInterface {
  handleViewChange: () => void;
  code: Project | null;
  content: string;
  loader: boolean;
  view: boolean;
}

export interface OverviewRightInterface {
  code: Project | null;
  loader: boolean;
  handleViewChange: () => void;
  view: boolean;
}

export interface OverviewLeftInterface {
  content: string;
  loader: boolean;
  view: boolean;
}

export interface IconInterface {
  classes?: string;
}
