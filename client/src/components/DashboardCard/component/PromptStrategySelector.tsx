'use client';

import Dropdown from '@/components/Dropdown';
import { PromptingStrategyData } from '@/constants/PromptStrategyData';
import { StoreModel } from '@/redux/model';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function PromptStrategySelector() {
  const selectedStrategy = useStoreState<StoreModel>(
    (state) => state.promptingStrategyModel.strategy
  );

  const setSelectedStrategy = useStoreActions<StoreModel>(
    (actions) => actions.promptingStrategyModel.setStrategy
  );

  const promptData = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );

  if (!promptData.loader) {
    return (
      <Dropdown
        items={PromptingStrategyData}
        selectedItem={selectedStrategy}
        onSelect={setSelectedStrategy}
      />
    );
  }
}
