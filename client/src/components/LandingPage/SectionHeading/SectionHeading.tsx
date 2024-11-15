import React from 'react';

const SectionHeading = ({
  title,
  paragraphg,
}: {
  title: string;
  paragraphg?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="items-center text-center font-Jakarta text-xl font-bold text-black md:text-6xl">
        {title}
      </h2>
      <p className="mb-4 mt-4 text-center font-Jakarta text-lg font-normal text-black sm:mb-12 md:text-2xl">
        {paragraphg}
      </p>
    </div>
  );
};

export default SectionHeading;
