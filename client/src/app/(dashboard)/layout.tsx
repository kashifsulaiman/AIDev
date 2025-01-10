import MainSideBar from '@/components/SideBar';
import React from 'react';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <MainSideBar />
      <main className="ml-16 flex-1 overflow-hidden max-sm:ml-10">
        {children}
      </main>
    </div>
  );
};

export default layout;
