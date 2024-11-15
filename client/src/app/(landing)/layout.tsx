import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

import React from 'react';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="overflow-hidden">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
