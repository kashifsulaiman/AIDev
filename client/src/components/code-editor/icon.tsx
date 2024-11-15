import React, { ReactNode } from 'react';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiJson,
} from 'react-icons/si';
import { FcFolder, FcOpenedFolder, FcPicture, FcFile } from 'react-icons/fc';
import { AiFillFileText } from 'react-icons/ai';

const iconCache = new Map<string, ReactNode>([
  ['js', <SiJavascript key="4123uo132u" color="#fbcb38" />],
  ['jsx', <SiJavascript key="142123432" color="#fbcb38" />],
  ['ts', <SiTypescript key="53434242" color="#378baa" />],
  ['tsx', <SiTypescript key="873498374" color="#378baa" />],
  ['css', <SiCss3 key="434iu32iuy" color="purple" />],
  ['json', <SiJson key="hkjs9874" color="#5656e6" />],
  ['html', <SiHtml5 key="2342ykjds" color="#e04e2c" />],
  ['png', <FcPicture key="iufdoiw73" />],
  ['jpg', <FcPicture key="234hjkj987" />],
  ['ico', <FcPicture key="234hhi34" />],
  ['txt', <AiFillFileText key="reqwriui33" color="white" />],
  ['closedDirectory', <FcFolder key="e38493eewr" />],
  ['openDirectory', <FcOpenedFolder key="dsjfkjds434" />],
]);

export const getIcon = (extension: string, name: string): ReactNode => {
  if (iconCache.has(extension)) return iconCache.get(extension);
  if (iconCache.has(name)) return iconCache.get(name);
  return <FcFile />;
};
