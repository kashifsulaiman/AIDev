'use client';

import OverviewLeft from './OverviewLeft';
import OverviewRight from './OverviewRight';
import React, { useState } from 'react';

const OverviewMain = () => {
  const [view, setView] = useState(true);

  const handleViewChange = () => {
    setView(!view);
  };
  return (
    <div className="flex max-h-screen min-h-screen w-full max-sm:max-h-full max-sm:flex-col max-sm:gap-4">
      <OverviewLeft view={view} />
      <OverviewRight handleViewChange={handleViewChange} view={view} />
    </div>
  );
};

export default OverviewMain;
