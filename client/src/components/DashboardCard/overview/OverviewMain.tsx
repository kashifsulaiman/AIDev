'use client';

import React from 'react';
import OverviewLeft from './OverviewLeft';
import OverviewRight from './OverviewRight';
import { OverviewMainInterface } from '@/types/interface';

const OverviewMain = ({
  handleViewChange,
  code,
  content,
  loader,
  view,
}: OverviewMainInterface) => {
  return (
    <div className="flex max-h-screen min-h-screen w-full overflow-hidden max-sm:max-h-full max-sm:flex-col max-sm:gap-4">
      <OverviewLeft content={content} loader={loader} view={view} />
      <OverviewRight
        code={code}
        loader={loader}
        handleViewChange={handleViewChange}
        view={view}
      />
    </div>
  );
};

export default OverviewMain;
