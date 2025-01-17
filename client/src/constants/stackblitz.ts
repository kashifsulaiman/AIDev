import { EmbedOptions } from '@stackblitz/sdk';

export const StackblitzSettingMain: EmbedOptions = {
  height: 600,
  openFile: 'package.json',
  terminalHeight: 50,
  startScript: 'dev',
  hideDevTools: true,
  view: 'preview',
  theme: 'light',
  hideNavigation: true,
};

export const StackblitzSettingPreview: EmbedOptions = {
  ...StackblitzSettingMain,
  hideExplorer: true,
  showSidebar: false,
};
