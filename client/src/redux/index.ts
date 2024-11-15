import { createTypedHooks } from 'easy-peasy';

import { StoreModel } from './model';

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<StoreModel>();
