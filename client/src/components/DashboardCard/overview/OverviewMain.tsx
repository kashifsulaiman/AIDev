'use client';

import OverviewLeft from './OverviewLeft';
import OverviewRight from './OverviewRight';
import React, { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { StoreModel } from '@/redux/model';

const OverviewMain = () => {
  const [view, setView] = useState(true);

  const clearPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.clearPrompt
  );
  const clearConversation = useStoreActions<StoreModel>(
    (actions) => actions?.conversationModel?.clearConversation
  );

  const handleViewChange = () => {
    setView(!view);
  };

  useEffect(() => {
    return () => {
      clearPrompt();
      clearConversation();
    };
  }, []);

  return (
    <div className="flex h-full w-full items-start justify-start overflow-hidden max-sm:max-h-full max-sm:flex-col max-sm:gap-4">
      <OverviewLeft view={view} />
      <OverviewRight handleViewChange={handleViewChange} view={view} />
    </div>
  );
};

export default OverviewMain;
