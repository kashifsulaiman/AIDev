'use client';

import Dropdown from '@/components/Dropdown';
import { AIModelData } from '@/constants/modelDropdownData';
import { StoreModel } from '@/redux/model';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ModelSelector() {
  const selectedModel = useStoreState<StoreModel>(
    (state) => state.aiModel.model
  );

  const setSelectedModel = useStoreActions<StoreModel>(
    (actions) => actions.aiModel.setModel
  );
  const promptData = useStoreState<StoreModel>(
    (state) => state?.promptModel?.prompt
  );

  if (!promptData.loader) {
    return (
      <Dropdown
        items={AIModelData}
        selectedItem={selectedModel}
        onSelect={setSelectedModel}
      />
    );
  }
}
