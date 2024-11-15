import React from 'react';
import { buildFileTree, Directory } from './../utils/file-manager';
import { getProjectDir } from '@/config/api.config';

export const useFilesFromSandbox = (
  id: string,
  callback: (dir: Directory) => void
) => {
  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await getProjectDir(id);
      const rootDir = buildFileTree(data);
      callback(rootDir);
    };
    fetchData();
  }, [id]);
};
