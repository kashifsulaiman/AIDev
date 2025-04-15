export {};

declare global {
  interface Window {
    showDirectoryPicker: () => Promise<ExtendedFileSystemDirectoryHandle>;
  }

  interface ExtendedFileSystemDirectoryHandle
    extends FileSystemDirectoryHandle {
    entries?: () => AsyncIterableIterator<[string, FileSystemHandle]>;
  }
}
