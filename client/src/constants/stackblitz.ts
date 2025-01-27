import { EmbedOptions } from '@stackblitz/sdk';

export const StackblitzSettingMain: EmbedOptions = {
  openFile: 'package.json',
  terminalHeight: 20,
  startScript: 'dev',
  hideDevTools: true,
  view: 'preview',
  theme: 'light',
  hideNavigation: true,
  hideExplorer: true,
  forceEmbedLayout: true,
  clickToLoad: true,
};
