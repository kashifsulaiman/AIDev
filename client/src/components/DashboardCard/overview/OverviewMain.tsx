'use client';

import OverviewLeft from './OverviewLeft';
import OverviewRight from './OverviewRight';
import React, { useState, useEffect } from 'react';
import { StoreModel } from '@/redux/model';
import { useStoreActions } from 'easy-peasy';

const OverviewMain = () => {
  const [view, setView] = useState(true);

  const handleViewChange = () => {
    setView(!view);
  };
  const clearPrompt = useStoreActions<StoreModel>(
    (actions) => actions?.promptModel?.clearPrompt
  );
  const clearConversation = useStoreActions<StoreModel>(
    (actions) => actions?.conversationModel?.clearConversation
  );
  const clearSelfPromptingIteration = useStoreActions<StoreModel>(
    (actions) => actions?.selfPromptingModel?.clearSelfPromptingIteration
  );
  useEffect(() => {
    return () => {
      clearPrompt();
      clearConversation();
      clearSelfPromptingIteration();
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
