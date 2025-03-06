import { Project } from '@stackblitz/sdk';
import { DropdownItemType } from './modalTypes';

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

export interface DropdownInterface {
  items: DropdownItemType[];
  selectedItem: DropdownItemType;
  onSelect: (item: DropdownItemType) => void;
}
