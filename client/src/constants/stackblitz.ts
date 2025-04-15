import { EmbedOptions } from '@stackblitz/sdk';

export const StackblitzSettingMain: (startCommand: string) => EmbedOptions = (
  startCommand: string
) => {
  return {
    openFile: 'package.json',
    terminalHeight: 20,
    startScript: startCommand,
    hideDevTools: true,
    view: 'preview',
    theme: 'light',
    hideNavigation: true,
    hideExplorer: true,
  };
};
