import { useState, useRef, useEffect } from 'react';
import {
  Dropdown as NextDropDown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from '@nextui-org/react';
import { ArrowDropdownIcon, DropdownCheckIcon } from '@/components/SVG';
import { DropdownInterface } from '@/types/interface';

export default function Dropdown({
  items,
  selectedItem,
  onSelect,
}: DropdownInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NextDropDown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          size="lg"
          className="flex w-72 items-center justify-between rounded-md px-2 text-left text-sm font-medium text-gray-700 focus:outline-none"
        >
          {selectedItem.img && (
            <Avatar
              src={selectedItem.img}
              classNames={{
                base: 'bg-transparent',
                img: '!size-8 !rounded-full',
              }}
            />
          )}
          <span className="py-4">{selectedItem.label}</span>
          <ArrowDropdownIcon classes="ml-2 h-4 w-4 my-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Model Selection" className="w-72">
        {items.map((item) => (
          <DropdownItem
            key={item.value}
            startContent={
              <Avatar
                src={item.img}
                classNames={{
                  base: 'bg-transparent',
                  img: '!size-8 !rounded-full',
                }}
              />
            }
            onClick={() => onSelect(item)}
            className={
              selectedItem.value === item.value
                ? 'bg-indigo-50 text-indigo-900'
                : 'text-gray-900'
            }
          >
            <span className="relative flex w-full items-center gap-4">
              {item.label}
              {selectedItem.value === item.value && (
                <DropdownCheckIcon classes=" h-5 w-5 text-custom-purple absolute right-2" />
              )}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </NextDropDown>
  );
}
