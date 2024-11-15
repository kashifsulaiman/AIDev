import React from 'react';
import Link from 'next/link';
import { Listbox, ListboxItem } from '@nextui-org/react';

interface MenuItem {
  label: string;
  href: string;
  icon: JSX.Element | null;
}

interface SidebarMenuProps {
  items: MenuItem[];
  isCollapsed: boolean;
  onItemClick: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  isCollapsed,
  onItemClick,
}) => {
  return (
    <Listbox
      aria-labelledby="listbox-label"
      id="sidebar-list"
      className="Scroller-Class lg:overflow-y-[initial] mt-4 flex max-h-56 flex-col items-center justify-center gap-1 overflow-y-auto px-4 lg:max-h-[initial]"
    >
      {items.map((item, index) => (
        <ListboxItem
          key={`menu-${item.label}-${index}`}
          className="flex items-center justify-center text-[#64748B]"
          classNames={{
            base: 'rounded-[99px] py-0 px-0 w-auto',
          }}
          textValue={item.label}
        >
          <Link
            href={item.href}
            className={`flex items-center gap-3 rounded-[99px] transition-all duration-300 ${isCollapsed ? 'justify-center px-2 py-2.5' : 'px-4 py-3'} transition-colors hover:!bg-purple-white-gradient hover:!text-white ${
              isCollapsed ? 'h-12 w-12' : ''
            }`}
            onClick={onItemClick}
          >
            <span
              className={` ${isCollapsed ? 'size-7 text-[28px]' : 'size-[20px] text-xl'}`}
            >
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="font-Jakarta text-sm font-medium">
                {item.label}
              </span>
            )}
          </Link>
        </ListboxItem>
      ))}
    </Listbox>
  );
};

export default SidebarMenu;
