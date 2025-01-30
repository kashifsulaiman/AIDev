'use client';

import OverviewLeft from './OverviewLeft';
import OverviewRight from './OverviewRight';

const OverviewMain = () => {
  return (
    <div className="flex max-h-screen min-h-screen w-full max-sm:max-h-full max-sm:flex-col max-sm:gap-4">
      <OverviewLeft />
      <OverviewRight />
    </div>
  );
};

export default OverviewMain;
