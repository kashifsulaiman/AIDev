import { Listbox, ListboxItem } from '@nextui-org/react';

const MenuSkeleton = ({ isCollapsed, length }: any) => {
  return (
    <Listbox
      aria-labelledby="listbox-label"
      id="sidebar-list"
      className="Scroller-Class lg:overflow-y-[initial] mt-4 flex max-h-56 flex-col items-center justify-center gap-1 overflow-y-auto px-4 lg:max-h-[initial]"
    >
      {Array.from({ length: length }).map((_, index) => (
        <ListboxItem
          key={`skeleton-loader-${index}`}
          className="flex animate-pulse items-center justify-center text-[#E2E8F0]"
          classNames={{
            base: 'rounded-[99px] py-0 px-0 w-auto',
          }}
          textValue="sekeleton-loader"
        >
          <div
            className={`flex items-center gap-3 rounded-[99px] transition-all duration-300 ${
              isCollapsed ? 'px-2 py-2.5' : 'px-4 py-3'
            } ${isCollapsed ? 'h-12 w-12' : ''}`}
          >
            <span
              className={`${isCollapsed ? 'size-8' : 'size-[20px]'} rounded-full bg-gray-300`}
            ></span>
            {!isCollapsed && (
              <span className="h-4 w-20 rounded-md bg-gray-300 font-Jakarta text-sm font-medium">
                {/* Placeholder for label */}
              </span>
            )}
          </div>
        </ListboxItem>
      ))}
    </Listbox>
  );
};

export default MenuSkeleton;
