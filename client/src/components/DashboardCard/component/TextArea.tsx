'use client';

import React from 'react';
import { Textarea, Button } from '@nextui-org/react';
import { Addicon } from '@/components/SVG';
import { useStoreActions } from 'easy-peasy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const TextArea = ({
  value,
  prompt,
  classNames,
  // isExpanded,
  ...props
}: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setPrompt = useStoreActions(
    (actions: any) => actions?.promptModel?.setPrompt
  );

  return (
    <div className="relative mt-10 flex w-full items-end justify-between rounded-xl bg-white shadow-lg xl:mb-5">
      <div className="flex w-full items-end">
        <Button
          className={`${
            !prompt?.question ? 'cursor-not-allowed bg-opacity-30' : ''
          } absolute left-1 z-[5] w-auto min-w-fit bg-transparent p-0`}
        >
          <Addicon />
        </Button>

        <Textarea
          placeholder="Type '/' for commands"
          className="max-w-full resize-none text-black shadow-none"
          value={value || prompt?.question}
          maxRows={6}
          classNames={{
            base: `!p-0 !bg-transparent ${classNames?.base}`,
            innerWrapper: `flex items-center ${classNames?.innerWrapper}`,
            input: `scrollbar-hide  !rounded-none !min-h-[60px] ${classNames?.input}`,
            inputWrapper: `!pl-[30px] !pr-[42px] bg-transparent data-[hover=true]:bg-transparent data-[focus=true]:!bg-transparent shadow-none ${classNames?.inputWrapper}`,
          }}
          {...props}
        />
      </div>

      <Button
        disabled={!prompt?.question}
        className={`${
          !prompt?.question ? 'cursor-not-allowed bg-opacity-30' : ''
        } absolute bottom-1 right-2.5 z-[5] h-auto min-w-fit rounded-md bg-custom-gradient px-3 py-2.5 text-white group-hover:bg-custom-white`}
        onClick={() => {
          const current = new URLSearchParams(
            Array.from(searchParams.entries())
          );
          current.delete('promptType');
          const search = current.toString();
          const query = search ? `?${search}` : '';
          router.push(`${pathname}${query}`);
          setPrompt(prompt);
          router.push('/overview');
        }}
      >
        <span className="leading-none">Code</span>
      </Button>
    </div>
  );
};

export default TextArea;
