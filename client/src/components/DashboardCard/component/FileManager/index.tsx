import { useEffect, useState } from 'react';
import { FileManagerSectionProps, RepoItemsType } from '@/types/modalTypes';
import BreadcrumbSection from './BreadcrumbSection';
import SelectAllSection from './SelectAllSection';
import FileAndFolderViewSection from './File&FolderViewSection';
import CapacitySection from './CapacitySection';

export default function FileManagerSection({
  folderItems,
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
    folderItems?.filter((item) => {
      if (!item.name.startsWith(currentPath)) return false;
      const relativePath = item.name.replace(currentPath, '');
      return (
        !relativePath.includes('/') || relativePath.split('/').length === 1
      );
    }) ?? [];

  const getFolderSelectionState = (folderName: string) => {
    if (!folderItems) return 'none';

    const fullPath = `${currentPath}${folderName}/`;
    const uniqueItems = new Set<string>();

    const getAllNestedItems = (folderPath: string): typeof folderItems => {
      if (!folderItems) return [];

      const children =
        folderItems.filter((item) => item.name.startsWith(folderPath)) ?? [];
      let allItems: typeof folderItems = [];

      children.forEach((child) => {
        if (!uniqueItems.has(child.name)) {
          uniqueItems.add(child.name);
          allItems.push(child);
        }

        if (child.type === 'folder') {
          const nestedItems = getAllNestedItems(`${child.name}/`) ?? [];
          allItems = [...allItems, ...nestedItems];
        }
      });

      return allItems;
    };

    const allChildren = getAllNestedItems(fullPath) ?? [];

    const selectedChildren =
      localSelected?.filter((item) => item.name.startsWith(fullPath)) ?? [];

    if (
      selectedChildren.length === allChildren.length &&
      allChildren.length > 0
    ) {
      return 'checked';
    }
    if (selectedChildren.length > 0) {
      return 'partial';
    }
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
      folderItems?.filter((item) => item.name.startsWith(fullPath)) ?? [];
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

  useEffect(() => {
    let totalSize = 0;
    localSelected.map((item) => {
      totalSize = totalSize + item.size;
    });
    const totalTokens = totalSize / 4;
    setCapacity(totalTokens);
  }, [localSelected]);

  return (
    <div className="h-full w-full overflow-hidden bg-white px-6 py-2">
      <BreadcrumbSection
        capacity={capacity}
        currentPath={currentPath}
        localSelected={localSelected}
        selectedRepo={selectedRepo}
        setCurrentPath={setCurrentPath}
        setSelectedItems={setSelectedItems}
      />

      <SelectAllSection
        currentPath={currentPath}
        filteredItems={filteredItems}
        getFolderSelectionState={getFolderSelectionState}
        localSelected={localSelected}
        repoItems={folderItems}
        setLocalSelected={setLocalSelected}
      />

      <FileAndFolderViewSection
        filteredItems={filteredItems}
        getFolderSelectionState={getFolderSelectionState}
        handleFolderClick={handleFolderClick}
        handleSelectFolder={handleSelectFolder}
        handleSelectItem={handleSelectItem}
        localSelected={localSelected}
      />

      <CapacitySection capacity={capacity} />
    </div>
  );
}
