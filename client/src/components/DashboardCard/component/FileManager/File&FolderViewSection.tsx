import {
  CheckboxIcon,
  EmptyCheckboxIcon,
  FileIcon,
  FolderIcon,
  PartialCheckboxIcon,
} from '@/components/SVG';
import { FileAndFolderViewSectionInterface } from '@/types/interface';

export default function FileAndFolderViewSection({
  filteredItems,
  getFolderSelectionState,
  localSelected,
  handleSelectItem,
  handleSelectFolder,
  handleFolderClick,
}: FileAndFolderViewSectionInterface) {
  return (
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
                <span
                  className="mr-2 cursor-pointer text-green-500"
                  onClick={() =>
                    handleSelectFolder(item.name.split('/').pop()!)
                  }
                >
                  <CheckboxIcon />
                </span>
              ) : selectionState === 'partial' ? (
                <span
                  className="mr-2 cursor-pointer text-yellow-500"
                  onClick={() =>
                    handleSelectFolder(item.name.split('/').pop()!)
                  }
                >
                  <PartialCheckboxIcon />
                </span>
              ) : (
                <span
                  className="mr-2 cursor-pointer text-gray-500"
                  onClick={() =>
                    handleSelectFolder(item.name.split('/').pop()!)
                  }
                >
                  <EmptyCheckboxIcon />
                </span>
              )
            ) : isSelected ? (
              <span
                className="mr-2 cursor-pointer text-green-500"
                onClick={() => handleSelectItem(item)}
              >
                <CheckboxIcon />
              </span>
            ) : (
              <span
                className="mr-2 cursor-pointer text-gray-500"
                onClick={() => handleSelectItem(item)}
              >
                <EmptyCheckboxIcon />
              </span>
            )}

            {item.type === 'folder' ? (
              <div
                className="flex items-center gap-1"
                onClick={() => handleFolderClick(item.name.split('/').pop()!)}
              >
                <FolderIcon classes="mr-2 cursor-pointer text-gray-500" />
                <span className="flex-grow cursor-pointer">
                  {item.name.split('/').pop()}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <FileIcon classes="mr-2 text-gray-500" />
                <span className="flex-grow">{item.name.split('/').pop()}</span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
