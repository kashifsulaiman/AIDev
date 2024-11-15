import React from 'react';

import Feature6 from './Feature6/Feature6';
import Features2 from './Feature2/index';
import Features3 from './Feature3/index';
import Features5 from './Feature5/index';
import HeroSection from './HeroSection/index';
import Cards from './Cards.tsx/index';
import Features1 from './Feature1/index';
import Features4 from './Feature4';

const LandingPage = () => {
  return (
    <>
      <div className="relative before:absolute before:inset-x-0 before:-top-[110px] before:z-[1] before:h-[calc(100%_+_110px)] before:w-full before:bg-[url('/asstes/images/bg-header.png')] before:bg-cover before:bg-left-top before:bg-no-repeat after:absolute after:bottom-0 after:z-0 after:h-[calc(100%_+_110px)] after:w-full after:bg-[#f9f9f9] after:bg-[url('/asstes/images/bg-pattern.png')] after:opacity-100">
        <HeroSection />
        <Cards />
      </div>
      <Feature6 />
      <div className="bg-[url('/asstes/images/Featurebackground.png')] bg-cover bg-center bg-no-repeat">
        <Features2 />
        <Features3 />
        <Features4 />
      </div>
      <Features5 />
      <Features1 />
      {/* <div>
        <Testimonials />
      </div> */}
    </>
  );
};

export default LandingPage;
