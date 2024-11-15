import React, { ReactNode } from 'react';

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <aside className="DashboardScroller block h-screen w-64 border-r border-gray-100 pt-1">
      {children}
    </aside>
  );
};

export default Sidebar;
