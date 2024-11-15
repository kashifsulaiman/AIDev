import TermsAndCondition from '@/components/Policy/TermsAndCondition';
import React from 'react';

const TermsAndConditionPage = () => {
  return (
    <>
      <div>
        <div className="absolute top-[0px] z-[0] h-[782px] w-full overflow-hidden bg-[url('/asstes/images/bg-header.png')] opacity-100" />
        <h3 className="relative z-[1] py-16 text-center font-Jakarta text-[28px] font-bold text-[#000] lg:py-40 lg:text-[56px] 2xl:py-[200px]">
          Terms and Conditions
        </h3>
        <div className="mx-auto max-w-[1064px]">
          <p className="mb-8 pl-4 font-Jakarta text-[20px] font-medium leading-[40.32px] !text-contactcolors-100 text-[#0E2242] md:text-[32px]">
            Last updated Oct 10, 2024
          </p>
          <TermsAndCondition />
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionPage;
