'use client';

import React from 'react';

import TextArea from '../component/TextArea';

import { useStoreState } from 'easy-peasy';

import { Resizable } from 're-resizable';
import { OverviewLeftInterface } from '@/types/interface';
import { StoreModel } from '@/redux/model';
import Messages from '../component/Messages';
import UploadImportProjectButton from '../component/UploadImportButton';
import StagesLoader from './StagesLoader';

const OverviewLeft = ({ view }: OverviewLeftInterface) => {
  const { title, loader } = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );
  const conversation = useStoreState<StoreModel>(
    (state) => state?.conversationModel?.conversation
  );

  return (
    <Resizable
      minWidth={400}
      style={{ display: view ? 'flex' : 'none' }}
      defaultSize={{
        width: '36%',
      }}
      maxWidth={'70%'}
      className="relative flex max-h-screen flex-col justify-around overflow-hidden px-3 pt-[21px] shadow-2xl max-sm:w-full md:px-11"
    >
      <h4 className="mb-8 text-2xl font-semibold text-black md:mb-16">
        {title}
      </h4>

      <div className="relative pb-12 md:pb-2">
        <div className="absolute right-0 top-6 z-[0] flex items-center gap-2">
          <UploadImportProjectButton />
        </div>

        <StagesLoader />
      </div>

      {loader && !conversation.messages.length ? (
        <div className="h-[550px]"></div>
      ) : (
        <>
          <Messages />
          <div className="mt-auto">
            <TextArea />
          </div>
        </>
      )}
    </Resizable>
  );
};

export default OverviewLeft;
