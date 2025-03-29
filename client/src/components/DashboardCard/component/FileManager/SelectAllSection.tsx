import { CheckboxIcon, EmptyCheckboxIcon } from '@/components/SVG';
import { SelectAllSectionInterface } from '@/types/interface';

export default function SelectAllSection({
  filteredItems,
  getFolderSelectionState,
  localSelected,
  setLocalSelected,
  currentPath,
  repoItems,
}: SelectAllSectionInterface) {

  const handleSelectAll = () => {
    if (!filteredItems.length) return;

    const allSelected = filteredItems.every((item) =>
      item.type === 'folder'
        ? getFolderSelectionState(item.name) === 'checked'
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

        const getAllNestedItems = (folderPath: string): typeof repoItems => {
          if (!repoItems) return [];

          const children = repoItems.filter((item) => item.name.startsWith(folderPath)) ?? [];
          let allItems: typeof repoItems = [];

          children.forEach((child) => {
            if (!newSelection.has(child.name)) {
              newSelection.add(child.name);
              allItems.push(child);
            }

            if (child.type === 'folder') {
              const nestedItems = getAllNestedItems(currentPath + child.name + "/") ?? [];
              allItems = [...allItems, ...nestedItems];
            }
          });

          return allItems;
        };
        filteredItems.forEach((item) => {
          if (item.type === 'folder') {
            const folderPath = `${item.name}/`;
            const nestedItems = getAllNestedItems(folderPath) ?? [];
            newSelection.add(item.name);
            nestedItems.forEach((child) => newSelection.add(child.name));
          } else {
            newSelection.add(item.name);
          }
        });

        return repoItems?.filter((item) => newSelection.has(item.name)) ?? [];
      }
    });
  };



  return (
    <div className="mb-2 flex items-center">
      <li className="flex items-center py-2">
        {filteredItems.every((item) =>
          localSelected.some((sel) => sel.name === item.name)
        ) ? (
          <span
            className="mr-2 cursor-pointer text-green-500"
            onClick={handleSelectAll}
          >
            <CheckboxIcon />
          </span>
        ) : (
          <span
            className="mr-2 cursor-pointer text-gray-500"
            onClick={handleSelectAll}
          >
            <EmptyCheckboxIcon />
          </span>
        )}
      </li>
      <label className="cursor-pointer font-semibold" onClick={handleSelectAll}>
        Select All
      </label>
    </div>
  );
}
