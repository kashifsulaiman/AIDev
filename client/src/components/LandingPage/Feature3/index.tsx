'use client';

import { CButton } from '@/common/button';
import GenericImage from '@/common/GenericImage/index';
import Text from '@/common/text/Index';
import { useRouter } from 'next/navigation';
import React from 'react';

function Features6() {
  const router = useRouter();

  const ContacthandleClick = () => {
    router.push('/log-in');
  };

  return (
    <div className="mx-auto max-w-full border border-[#0000] px-4 pb-6 pt-10 md:max-w-[630px] lg:max-w-[924px] lg:pb-10 lg:pt-20 xl:max-w-[1230px] min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
      <div className="h-full w-full rounded-[32px] bg-white">
        <div className="flex w-full flex-col items-center justify-between gap-3 py-7 pl-[20px] pr-[20px] xl:flex-row xl:gap-10 xl:py-0 xl:pl-[80px] xl:pr-[135px]">
          <div className="flex flex-col items-center justify-start xl:items-start">
            <h2 className="max-w-[615px] text-center font-Jakarta text-3xl font-bold text-black md:text-6xl xl:text-start">
              Get your AI Dev for free in your favourite IDE
            </h2>
            <Text className="mb-6 mt-5 max-w-[693px] text-center font-Jakarta text-lg font-normal !text-black md:mb-10 md:text-2xl xl:mt-[30px] xl:text-start">
              Unlock AI DEV on your favorite tools and platforms. Integrate
              seamlessly with your preferred IDE for a smoother, more efficient
              coding experience.
            </Text>
            <CButton
              variant="primary"
              onClick={ContacthandleClick}
              label=" Learn More"
              className="h-[53px] rounded-[100px] border border-[#376EE7] bg-[Gradient] bg-gradient-to-r from-custom-purple to-custom-blue px-14 py-[15px] text-start text-base font-bold text-white md:text-lg"
            />
          </div>
          <div className="z-10 my-5 xl:my-[77px]">
            <GenericImage
              src={'asstes/images/editoricons.png'}
              alt="NextUI hero Image"
              className="h-auto lg:h-[438.88px] lg:max-w-[443px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features6;
