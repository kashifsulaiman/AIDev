import { useCallback, useEffect, useState } from 'react';
import {
  FaFile,
  FaFolder,
  FaCheckSquare,
  FaMinusSquare,
  FaRegSquare,
} from 'react-icons/fa';
import { Progress } from '@nextui-org/react';
import { FileManagerSectionProps, RepoItemsType } from '@/types/modalTypes';

export const MAX_TOKENS = 55000;

export default function FileManagerSection({
  repoItems,
  selectedRepo,
  selectedItems,
  setSelectedItems,
}: FileManagerSectionProps) {
  const [currentPath, setCurrentPath] = useState<string>('');
  const [localSelected, setLocalSelected] = useState<RepoItemsType[]>(
    selectedItems ?? []
  );
  const [capacity, setCapacity] = useState<number>(0);

  const filteredItems =
    repoItems?.filter((item) => {
      if (!item.name.startsWith(currentPath)) return false;
      const relativePath = item.name.replace(currentPath, '');
      return (
        !relativePath.includes('/') || relativePath.split('/').length === 1
      );
    }) ?? [];

  const getFolderSelectionState = (folderName: string) => {
    const fullPath = `${currentPath}${folderName}/`;
    const children =
      repoItems?.filter((item) => item.name.startsWith(fullPath)) ?? [];
    const selectedChildren = localSelected.filter((item) =>
      item.name.startsWith(fullPath)
    );

    if (selectedChildren.length === children.length && children.length > 0)
      return 'checked';
    if (selectedChildren.length > 0) return 'partial';
    return 'none';
  };

  const handleSelectItem = (item: RepoItemsType) => {
    setLocalSelected((prev) => {
      const isSelected = prev.some((selected) => selected.name === item.name);
      return isSelected
        ? prev.filter((selected) => selected.name !== item.name)
        : [...prev, item];
    });
  };

  const handleSelectFolder = (folderName: string) => {
    const fullPath = `${currentPath}${folderName}/`;
    const children =
      repoItems?.filter((item) => item.name.startsWith(fullPath)) ?? [];
    const selectedChildren = localSelected.filter((item) =>
      item.name.startsWith(fullPath)
    );

    setLocalSelected((prev) =>
      selectedChildren.length > 0
        ? prev.filter((item) => !item.name.startsWith(fullPath))
        : [...prev, ...children]
    );
  };

  const handleFolderClick = (folderName: string) => {
    setCurrentPath(`${currentPath}${folderName}/`);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = currentPath
      .split('/')
      .slice(0, index + 1)
      .join('/');
    setCurrentPath(newPath ? `${newPath}/` : '');
  };

  const handleSelectAll = () => {
    if (!filteredItems.length) return;

    const allSelected = filteredItems.every((item) =>
      item.type === 'folder'
        ? getFolderSelectionState(item.name.split('/').pop()!) === 'checked'
        : localSelected.some((sel) => sel.name === item.name)
    );

    setLocalSelected((prev) => {
      if (allSelected) {
        return prev.filter(
          (item) =>
            !filteredItems.some((fItem) => item.name.startsWith(fItem.name))
        );
      } else {
        const newSelection = new Set(prev.map((item) => item.name));

        filteredItems.forEach((item) => {
          if (item.type === 'folder') {
            const folderPath = `${currentPath}${item.name}/`;
            const children =
              repoItems?.filter((child) => child.name.startsWith(folderPath)) ??
              [];

            newSelection.add(item.name);

            children.forEach((child) => newSelection.add(child.name));
          } else {
            newSelection.add(item.name);
          }
        });

        return repoItems?.filter((item) => newSelection.has(item.name)) ?? [];
      }
    });
  };

  const handleImport = () => {
    if (capacity <= MAX_TOKENS) {
      setSelectedItems(localSelected);
    }
  };

  useEffect(() => {
    let totalSize = 0;
    localSelected.map((item) => {
      totalSize = totalSize + item.size;
    });
    const totalTokens = totalSize / 4;
    setCapacity(totalTokens);
  }, [localSelected]);

  const capacityPercentage: () => number = useCallback(() => {
    const newCapacity = Number(((capacity / MAX_TOKENS) * 100).toFixed(2));
    return newCapacity ? newCapacity : 0;
  }, [capacity]);

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <div className="h-full w-full overflow-hidden bg-white px-6 py-2">
      <div className="flex w-full items-center justify-between">
        <span>Select files to import </span>
        <button
          disabled={localSelected.length === 0 || capacity > MAX_TOKENS}
          onClick={handleImport}
          className={`rounded bg-custom-purple px-4 py-2 text-white ${localSelected.length || capacity > MAX_TOKENS ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
          Import
        </button>
      </div>

      <div className="mb-2 flex items-center">
        <span
          className="cursor-pointer text-custom-purple"
          onClick={() => setCurrentPath('')}
        >
          {selectedRepo?.label.split('/')[1]}
        </span>
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center">
            <span className="mx-2">/</span>
            <span
              className="cursor-pointer text-custom-purple"
              onClick={() => handleBreadcrumbClick(index)}
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>

      <div className="mb-2 flex items-center">
        <li className="flex items-center py-2">
          {filteredItems.every((item) =>
            localSelected.some((sel) => sel.name === item.name)
          ) ? (
            <FaCheckSquare
              className="mr-2 cursor-pointer text-green-500"
              onClick={handleSelectAll}
            />
          ) : (
            <FaRegSquare
              className="mr-2 cursor-pointer text-gray-500"
              onClick={handleSelectAll}
            />
          )}
        </li>
        <label
          className="cursor-pointer font-semibold"
          onClick={handleSelectAll}
        >
          Select All
        </label>
      </div>

      <ul className="h-48 w-full overflow-y-auto">
        {filteredItems.map((item) => {
          const selectionState =
            item.type === 'folder'
              ? getFolderSelectionState(item.name.split('/').pop()!)
              : 'none';
          const isSelected = localSelected.some(
            (selected) => selected.name === item.name
          );

          return (
            <li
              key={item.name}
              className="flex items-center border-b-[0.4px] border-b-gray-200 py-2"
            >
              {item.type === 'folder' ? (
                selectionState === 'checked' ? (
                  <FaCheckSquare
                    className="mr-2 cursor-pointer text-green-500"
                    onClick={() =>
                      handleSelectFolder(item.name.split('/').pop()!)
                    }
                  />
                ) : selectionState === 'partial' ? (
                  <FaMinusSquare
                    className="mr-2 cursor-pointer text-yellow-500"
                    onClick={() =>
                      handleSelectFolder(item.name.split('/').pop()!)
                    }
                  />
                ) : (
                  <FaRegSquare
                    className="mr-2 cursor-pointer text-gray-500"
                    onClick={() =>
                      handleSelectFolder(item.name.split('/').pop()!)
                    }
                  />
                )
              ) : isSelected ? (
                <FaCheckSquare
                  className="mr-2 cursor-pointer text-green-500"
                  onClick={() => handleSelectItem(item)}
                />
              ) : (
                <FaRegSquare
                  className="mr-2 cursor-pointer text-gray-500"
                  onClick={() => handleSelectItem(item)}
                />
              )}

              {item.type === 'folder' ? (
                <div
                  className="flex items-center gap-1"
                  onClick={() => handleFolderClick(item.name.split('/').pop()!)}
                >
                  <FaFolder className="mr-2 cursor-pointer text-gray-500" />
                  <span className="flex-grow cursor-pointer">
                    {item.name.split('/').pop()}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaFile className="mr-2 text-gray-500" />
                  <span className="flex-grow">
                    {item.name.split('/').pop()}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex w-full flex-col items-start pt-4">
        <span className="text-sm">
          {capacityPercentage()} % of capacity reached
        </span>
        <Progress
          classNames={{
            indicator:
              capacityPercentage() > 100 ? 'bg-red-600' : 'bg-custom-purple',
          }}
          aria-label="capacity"
          value={capacityPercentage()}
        />
      </div>
    </div>
  );
}
