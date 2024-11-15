'use client';
import { CButton } from '@/common/button';
import GenericImage from '@/common/GenericImage';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-opacity-25 bg-purple-white-commingsoon">
      <div className="flex flex-col items-center gap-5">
        <GenericImage
          className="max-w-[300px] object-cover sm:max-w-[420px]"
          alt="logo"
          src="/asstes/images/404.png"
        />
        <h2 className="font-Jakarta text-4xl font-bold text-purple-500">
          Error page not found
        </h2>
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

export default NotFound;
