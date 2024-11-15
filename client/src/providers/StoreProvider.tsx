'use client';

import { StoreProvider } from 'easy-peasy';

import store from '../redux/store';

type Props = StoreProvider['props'] & { children: React.ReactNode };

const StoreProviderCasted =
  StoreProvider as unknown as React.FunctionComponent<Props>;

export default function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreProviderCasted store={store}>{children}</StoreProviderCasted>;
}
