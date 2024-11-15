'use client';
import { CButton } from '@/common/button';
import GenericImage from '@/common/GenericImage';
import { useRouter } from 'next/navigation';
import React from 'react';

const Comming_Soon = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-opacity-25 bg-purple-white-commingsoon">
      <div className="flex flex-col items-center gap-5">
        <GenericImage
          className="max-w-[180px] object-cover"
          alt="logo"
          src="/asstes/images/coming-soon.png"
        />
        <p className="mt-5 font-Jakarta text-sm font-semibold text-black sm:text-lg">
          WE&apos;RE STILL
        </p>
        <h2 className="font-Jakarta text-5xl font-bold text-purple-500">
          Building Our Website.
        </h2>
        <p className="font-Jakarta text-sm font-semibold text-black sm:text-lg">
          We are going to launch our website very soon.
        </p>

        <CButton
          label="Go Back"
          variant="primary"
          className="mt-5 h-12 w-full font-Jakarta text-sm font-semibold shadow-lg sm:text-base"
          onClick={handleGoBack}
        />
      </div>
    </div>
  );
};

export default Comming_Soon;
