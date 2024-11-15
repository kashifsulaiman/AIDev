import React from 'react';
import { gettingStarted, platform } from '../../constants/footerData';
import SingleMenu from './SingleMenu';
import { Facebook, Instagram, Linkden, Twitter } from '../SVG/index';
import Text from '@/common/text/Index';

const FooterMenu = () => {
  return (
    <div className="mb-5 mt-10 flex flex-wrap justify-start gap-10 sm:mt-[146px] sm:pb-[30px] lg:mb-0 lg:justify-between">
      <div className="max-w-[330px]">
        <h3 className="pb-[16px] font-Jakarta text-[32px] font-bold">AI Dev</h3>
        <Text className="pb-[43px] font-Jakarta text-lg font-normal text-gray-300 md:leading-[31.13px]">
          {' '}
          AI DEV, we’re redefining software development with the power of AI.
          Our mission is simple: make coding faster, smarter, and more
          intuitive.
        </Text>
        <div className="flex items-center gap-[28.8px]">
          <p>
            <Twitter />
          </p>
          <p>
            <Facebook />
          </p>
          <p>
            <Instagram />
          </p>
          <p>
            <Linkden />
          </p>
        </div>
      </div>
      <SingleMenu title="Getting Started" data={gettingStarted} />
      <SingleMenu title="Terms of Service" data={platform} />
    </div>
  );
};

export default FooterMenu;
