'use client';
import { CButton } from '@/common/button';
import Text from '@/common/text/Index';
import { useRouter } from 'next/navigation';
import React from 'react';

const FooterInfo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/contact-us');
    router.push('sign-up');
  };
  return (
    <>
      <div className="border-b border-[#3F3F40] py-10 sm:pb-[50px] sm:pt-[107px]">
        <div className="block items-center justify-between lg:flex">
          <div className="mb-5 max-w-[550px] lg:mb-0">
            <p className="pb-4 font-Jakarta text-[38px] font-bold text-white">
              Ready to launch your next project?
            </p>
            <Text className="text-[22px]">
              With lots of unique blocks, you can easily build a page without
              coding. Build your next landing page.
            </Text>
          </div>
          <CButton
            className="h-[52px] border-0 px-6 text-xl"
            label="Try For Free"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default FooterInfo;
