import { RepoItemsType } from '@/types/modalTypes';

export async function getFolderContents(): Promise<{
  folderName: string;
  files: RepoItemsType[];
} | null> {
  if (typeof window === 'undefined' || !window.showDirectoryPicker) return null;

  try {
    const dirHandle: FileSystemDirectoryHandle =
      await window.showDirectoryPicker();
    const folderName: string = dirHandle.name;
    const files: RepoItemsType[] = [];

    const ignoredFolders = new Set([
      'node_modules',
      '.git',
      '.next',
      'dist',
      'build',
      'package-lock.json',
    ]);

    const readFilesRecursively = async (
      handle: ExtendedFileSystemDirectoryHandle,
      path: string
    ) => {
      for await (const entry of handle.entries?.() ?? []) {
        const [name, fileHandle] = entry;
        const fullPath = path ? `${path}/${name}` : name;

        if (ignoredFolders.has(name)) continue;

        if (fileHandle.kind === 'file') {
          const fileHandleCast = fileHandle as FileSystemFileHandle;
          const file = await fileHandleCast.getFile();
          const isPublicFile = fullPath.startsWith('public/');
          const content = await file.text();

          files.push({
            name: fullPath,
            size: isPublicFile ? 0 : file.size,
            type: 'file',
            content: content,
          });
        } else if (fileHandle.kind === 'directory') {
          const dirHandleCast = fileHandle as ExtendedFileSystemDirectoryHandle;
          files.push({ name: fullPath, size: 0, type: 'folder' });
          await readFilesRecursively(dirHandleCast, fullPath);
        }
      }
    };

    await readFilesRecursively(dirHandle, '');

    return { folderName, files };
  } catch (error) {
    console.error('❌ Error selecting folder:', error);
    return null;
  }
}

export function transformFilesToObject(files: RepoItemsType[]): {
  [key: string]: string;
} {
  const result: { [key: string]: string } = {};

  for (const file of files) {
    if (file.type === 'file' && file.content !== undefined) {
      result[file.name] = file.content;
    }
  }

  return result;
}
