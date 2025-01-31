import { Project } from '@stackblitz/sdk';

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
