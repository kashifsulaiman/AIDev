'use client';

import GenericImage from '@/common/GenericImage';
import { ArrowDropdownIcon, DropdownCheckIcon } from '@/components/SVG';
import { AIModelData } from '@/constants/modelDropdownData';
import { StoreModel } from '@/redux/model';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Image from 'next/image';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';

export default function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedModel = useStoreState<StoreModel>(
    (state) => state.aiModel.model
  );

  const setSelectedModel = useStoreActions<StoreModel>(
    (actions) => actions.aiModel.setModel
  );

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full max-w-sm" ref={dropdownRef}>
      <button
        type="button"
        className="flex w-[18rem] items-center justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-left text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedModel.img && (
          <Image
            width={100}
            height={100}
            className="size-8 rounded-full"
            alt="ai-image"
            src={selectedModel.img}
          />
        )}
        <span>{selectedModel.label}</span>
        <ArrowDropdownIcon classes="ml-2 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute top-0 z-10 w-full rounded-md bg-white shadow-lg">
          <ul
            className="overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
          >
            {AIModelData.map((model) => (
              <li
                key={model.value}
                className={`relative flex cursor-pointer select-none items-center py-2 pl-3 hover:bg-indigo-100 ${
                  selectedModel.value === model.value
                    ? 'bg-indigo-50 text-indigo-900'
                    : 'text-gray-900'
                }`}
                onClick={() => {
                  setSelectedModel(model);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={selectedModel.value === model.value}
              >
                <GenericImage
                  className="size-8 rounded-full"
                  alt="ai-image"
                  src={model.img}
                  classNames={{
                    img: 'w-8',
                  }}
                />
                <div className="flex items-center pl-4">
                  <span className="block truncate font-medium">
                    {model.label}
                  </span>
                </div>

                {selectedModel.value === model.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-custom-purple">
                    <DropdownCheckIcon classes="h-5 w-5" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
