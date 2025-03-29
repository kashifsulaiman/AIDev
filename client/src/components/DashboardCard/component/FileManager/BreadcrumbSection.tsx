import { MAX_TOKENS } from '@/constants/files-import';
import { BreadcrumbSectionInterface } from '@/types/interface';

export default function BreadcrumbSection({
  localSelected,
  setSelectedItems,
  selectedRepo,
  capacity,
  currentPath,
  setCurrentPath,
}: BreadcrumbSectionInterface) {
  const handleImport = () => {
    if (capacity <= MAX_TOKENS) {
      setSelectedItems(localSelected);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = currentPath
      .split('/')
      .slice(0, index + 1)
      .join('/');
    setCurrentPath(newPath ? `${newPath}/` : '');
  };

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <span>Select files to import </span>
        <button
          disabled={
            !localSelected.length || capacity > MAX_TOKENS || capacity <= 0
          }
          onClick={handleImport}
          className={`rounded bg-custom-purple px-4 py-2 text-white ${localSelected.length && capacity <= MAX_TOKENS && capacity > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
          Import
        </button>
      </div>

      <div className="mb-2 flex items-center">
        <span
          className="cursor-pointer text-custom-purple"
          onClick={() => setCurrentPath('')}
        >
          {selectedRepo?.label.split('/')[1] ?? selectedRepo.label}
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
    </>
  );
}
