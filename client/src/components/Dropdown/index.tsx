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
import React from 'react';

export default function Dropdown<
  T extends { label: string; img?: string; element?: () => React.ReactNode },
>({ items, selectedItem, onSelect }: DropdownInterface<T>) {
  return (
    <NextDropDown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          size="lg"
          className="flex w-72 items-center justify-between rounded-md bg-white px-2 text-left text-sm font-medium text-gray-700 focus:outline-none"
        >
          {selectedItem?.img && (
            <Avatar
              src={selectedItem?.img}
              classNames={{
                base: 'bg-transparent',
                img: '!size-8 !rounded-full',
              }}
            />
          )}
          <span className={` ${!selectedItem?.img && 'px-4'} py-4`}>
            {selectedItem.label}
          </span>
          <ArrowDropdownIcon classes="ml-2 h-4 w-4 my-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Model Selection"
        className="max-h-80 w-72 overflow-y-auto"
      >
        {items.map((item) => (
          <DropdownItem
            key={item.label}
            startContent={
              item.img && (
                <Avatar
                  src={item.img}
                  classNames={{
                    base: 'bg-transparent',
                    img: '!size-8 !rounded-full',
                  }}
                />
              )
            }
            onClick={() => onSelect(item)}
            className={
              selectedItem.label === item.label
                ? 'bg-indigo-50 text-indigo-900'
                : 'text-gray-900'
            }
          >
            <span className="relative flex w-full items-center gap-4">
              {item.label}
              {selectedItem.label === item.label && (
                <DropdownCheckIcon classes=" h-5 w-5 text-custom-purple absolute right-2" />
              )}
            </span>
            {item.element && item.element()}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </NextDropDown>
  );
}
