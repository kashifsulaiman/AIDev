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

  return (
    <Dropdown
      items={AIModelData}
      selectedItem={selectedModel}
      onSelect={setSelectedModel}
    />
  );
}
