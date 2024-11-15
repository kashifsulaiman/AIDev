import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import GenericImage from '@/common/GenericImage';

const Feature6 = () => {
  return (
    <div className="mx-auto max-w-full bg-white px-4 pb-6 pt-10 md:max-w-[630px] lg:max-w-[924px] lg:pb-10 lg:pt-20 xl:max-w-[1230px] min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
      <SectionHeading
        title="AI Generator: Your Intelligent Coding Partner"
        paragraphg="Harness the power of AI to automate, optimize, and accelerate your code development."
      />
      <div className="flex justify-center rounded-lg shadow-light-purple lg:mx-0">
        <GenericImage
          alt="dashboard-preview"
          src="/asstes/images/dashboardpreview.png"
          className="w-full max-w-[1619px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default Feature6;
