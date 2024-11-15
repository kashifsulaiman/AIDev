import PrivacyPolicy from '@/components/Policy/PrivacyPolicy';
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <>
      <div>
        <div className="absolute top-[0px] z-[0] h-[782px] w-full overflow-hidden bg-[url('/asstes/images/bg-header.png')] opacity-100" />
        <h3 className="relative z-[1] py-16 text-center font-Jakarta text-[28px] font-bold text-[#000] lg:py-40 lg:text-[56px] 2xl:py-[200px]">
          Privacy Policy
        </h3>
        <div className="mx-auto max-w-[1064px]">
          <p className="mb-8 pl-4 font-Jakarta text-xl font-medium leading-[40.32px] !text-contactcolors-100 sm:text-2xl lg:text-[32px]">
            Last updated Oct 10, 2024
          </p>
          <PrivacyPolicy />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
